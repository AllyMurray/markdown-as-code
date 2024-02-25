import { DocumentSection } from './section.js';
import { heading } from '../elements/heading.js';

export interface TableOfContents {
  title?: string;
  sections: ReadonlyArray<DocumentSection>;
}

export class TableOfContentsSection extends DocumentSection {
  constructor(private options: TableOfContents) {
    super({ title: 'Table of Contents' });
  }

  private generateTableOfContents(
    sections: ReadonlyArray<DocumentSection>,
    indent: number = 0,
  ): Array<string> {
    const tableOfContents: Array<string> = [];

    const indentation = ' '.repeat(indent);

    for (const section of sections) {
      tableOfContents.push(
        `${indentation}- [${section.title}](#${section.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/\\/g, '')})`,
      );

      tableOfContents.push(
        ...this.generateTableOfContents(section.subSections, indent + 2),
      );
    }

    return tableOfContents;
  }

  protected synthesizeContent(): Array<string> {
    return [
      heading(2, this.title),
      '',
      ...this.generateTableOfContents(this.options.sections),
    ];
  }
}

export function tableOfContentsSection(options: TableOfContents) {
  return new TableOfContentsSection(options);
}
