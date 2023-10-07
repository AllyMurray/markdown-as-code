import { writeFileSync } from 'fs';
import { join } from 'path';
import { ContentSection } from '../sections/content-section.js';
import { DocumentSection, tryFindSection } from '../sections/section.js';
import { tableOfContentsSection } from '../sections/table-of-contents.js';
import { heading } from '../syntax/heading.js';

export interface MarkdownOptions {
  fileName: string;

  /**
   * The directory the markdown file will be written to
   *
   * @default project root directory
   */
  outDir?: string;

  title: string;
  description?: string;

  /**
   * Include a table of contents in the output
   *
   * @default true
   */
  tableOfContents?: boolean;
}

export interface SectionContent<Section extends DocumentSection> {
  updater: (section: Section) => void;
  path: Array<string>;
}

export class MarkdownDocument {
  private _outDir: string;
  private _tableOfContents: boolean;
  private _sections: Array<DocumentSection> = [];

  constructor(private options: MarkdownOptions) {
    this._outDir = options.outDir ?? process.cwd();
    this._tableOfContents = options.tableOfContents ?? true;
    return this;
  }

  public addSection(section: DocumentSection): this;
  public addSection(title: string, content: string): this;
  public addSection(
    sectionOrTitle: DocumentSection | string,
    content?: string
  ): this {
    if (sectionOrTitle instanceof DocumentSection) {
      this._sections.push(sectionOrTitle);
      return this;
    }
    if (!content) {
      throw new Error('Content is required');
    }
    this._sections.push(new ContentSection({ title: sectionOrTitle, content }));
    return this;
  }

  appendSection<Section extends DocumentSection>({
    path,
    updater,
  }: SectionContent<Section>) {
    const section = tryFindSection<Section>(this._sections, path);
    if (!section) {
      throw new Error(`Section not found: ${path.join(' > ')}`);
    }
    updater(section);
    return this;
  }

  private synthesizeSections(sections: Array<DocumentSection>) {
    const lines: Array<string> = [];
    for (const section of sections) {
      lines.push(section.synthesize());

      if (section.subSections.length > 0) {
        lines.push(...this.synthesizeSections(section.subSections));
      }
    }
    return lines;
  }

  public synthContent() {
    let tableOfContents;
    if (this._tableOfContents) {
      tableOfContents = tableOfContentsSection({
        sections: this._sections,
      }).synthesize();
    }

    const lines = [
      heading(1, this.options.title),
      this.options.description,
      tableOfContents,
      '',
    ];

    lines.push(...this.synthesizeSections(this._sections));

    return lines.filter(Boolean).join('\n\n');
  }

  public synth() {
    writeFileSync(
      join(this._outDir, this.options.fileName),
      this.synthContent()
    );
  }
}

export const createMarkdownDocument = (options: MarkdownOptions) =>
  new MarkdownDocument(options);
