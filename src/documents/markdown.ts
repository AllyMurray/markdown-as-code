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

interface SortedSection {
  section: DocumentSection;
  sortOrder: number;
}

export class MarkdownDocument {
  private _outDir: string;
  private _tableOfContents: boolean;
  private _sortedSections: Array<SortedSection> = [];

  constructor(private options: MarkdownOptions) {
    this._outDir = options.outDir ?? process.cwd();
    this._tableOfContents = options.tableOfContents ?? true;
    return this;
  }

  private get sections() {
    return this._sortedSections
      .sort((sectionA, sectionB) => sectionA.sortOrder - sectionB.sortOrder)
      .map((sortedSection) => sortedSection.section);
  }

  private bumpSortOrder(startingSortOrder: number) {
    const maxSortOrder = Math.max(
      ...this._sortedSections.map((s) => s.sortOrder),
    );
    if (startingSortOrder <= maxSortOrder) {
      // Create a sorted array of all existing sort orders
      const existingSortOrders = this._sortedSections
        .map((s) => s.sortOrder)
        .sort((a, b) => a - b);
      for (
        let sortOrder = startingSortOrder;
        sortOrder <= maxSortOrder;
        sortOrder++
      ) {
        // If the current sort order does not exist in the array, there is a gap
        if (!existingSortOrders.includes(sortOrder)) {
          break;
        }
        // If there is no gap, increment the sort order of the section at this position
        for (let section of this._sortedSections) {
          if (section.sortOrder === sortOrder) {
            section.sortOrder++;
          }
        }
      }
    }
  }

  public addSection({ section, sortOrder = 0 }: AddSection) {
    this.bumpSortOrder(sortOrder);
    this._sortedSections.push({ section, sortOrder });
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
