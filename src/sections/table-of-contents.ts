import { DocumentSection } from './section.js';

export interface TableOfContents {
  title?: string;
  sections: Array<DocumentSection>;
}

export class TableOfContentsSection extends DocumentSection {
  constructor(private options: TableOfContents) {
    super('Table of Contents');
  }

  protected synthesizeContent(): Array<string> {
    return [
      `## ${this.title}`,
      '',
      ...this.options.sections.map(
        (section) =>
          `- [${section.title}](#${section.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/\\/g, '')})`
      ),
    ];
  }
}

export function tableOfContentsSection(options: TableOfContents) {
  return new TableOfContentsSection(options);
}
