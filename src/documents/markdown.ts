import { writeFileSync } from 'fs';
import { join } from 'path';
import { heading } from '../elements/heading.js';
import { DocumentSection, tryFindSection } from '../sections/section.js';
import { tableOfContentsSection } from '../sections/table-of-contents.js';

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

  content?: Array<DocumentSection>;

  /**
   * Include a table of contents in the output
   *
   * @default true
   */
  tableOfContents?: boolean;
}

export interface AddSection {
  section: DocumentSection;
  sortOrder?: number;
}

export class MarkdownDocument {
  private _outDir: string;
  private _tableOfContents: boolean;
  private _sortedSections: Array<DocumentSection> = [];

  constructor(private options: MarkdownOptions) {
    this._outDir = options.outDir ?? process.cwd();
    this._tableOfContents = options.tableOfContents ?? true;

    options.content?.forEach((section) => this.addSection(section));
    return this;
  }

  private get sections(): ReadonlyArray<DocumentSection> {
    return this._sortedSections;
  }

  public addSection(section: DocumentSection) {
    this._sortedSections.push(section);
    return this;
  }

  public tryFindSection<S extends DocumentSection>(path: Array<string>): S {
    return tryFindSection(this.sections, path) as S;
  }

  private synthesizeSections(sections: ReadonlyArray<DocumentSection>) {
    const lines: Array<string> = [];
    for (const section of sections) {
      lines.push(section.synthesize());

      if (section.subSections.length > 0) {
        lines.push(...this.synthesizeSections(section.subSections));
      }
    }
    return lines;
  }

  public get fileName() {
    return this.options.fileName;
  }

  public get outDir() {
    return this._outDir;
  }

  public get fullFilePath() {
    return join(this._outDir, this.options.fileName);
  }

  public synthContent() {
    let tableOfContents;
    if (this._tableOfContents) {
      tableOfContents = tableOfContentsSection({
        sections: this.sections,
      }).synthesize();
    }

    const lines = [
      heading(1, this.options.title),
      this.options.description,
      tableOfContents,
      '',
    ];

    lines.push(...this.synthesizeSections(this.sections));

    return lines.filter(Boolean).join('\n\n');
  }

  public synth() {
    writeFileSync(
      join(this._outDir, this.options.fileName),
      this.synthContent(),
    );
  }
}

export const createMarkdownDocument = (options: MarkdownOptions) =>
  new MarkdownDocument(options);
