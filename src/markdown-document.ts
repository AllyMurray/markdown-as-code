import { heading } from './elements/heading.js';
import { DocumentSection, tryFindSection } from './sections/section.js';
import { tableOfContentsSection } from './sections/table-of-contents.js';

export interface MarkdownDocumentOptions {
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
  private _tableOfContents: boolean;
  private _sortedSections: Array<DocumentSection> = [];

  private _title: string;

  constructor(private options: MarkdownDocumentOptions) {
    this._tableOfContents = options.tableOfContents ?? true;
    this._title = options.title;
    options.content?.forEach((section) => this.addSection(section));
    return this;
  }

  private get sections(): ReadonlyArray<DocumentSection> {
    return this._sortedSections;
  }

  public get title() {
    return this._title;
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

  public toString() {
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
}

export const markdownDocument = (options: MarkdownDocumentOptions) =>
  new MarkdownDocument(options);
