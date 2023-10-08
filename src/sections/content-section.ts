import { DocumentSection, DocumentSectionOptions } from './section.js';
import { heading } from '../syntax/heading.js';

interface ContentSectionOptions extends DocumentSectionOptions {
  content?: string;
}

export class ContentSection extends DocumentSection {
  private content: string;

  constructor(options: ContentSectionOptions) {
    super(options);
    this.content = options.content ?? '';
  }

  public appendContent(content: string) {
    this.content = this.content
      ? [this.content, '', content].join('\n')
      : content;
    return this;
  }

  protected synthesizeContent(): Array<string> {
    return [heading(this.headingLevel, this.title), '', this.content];
  }
}

export function contentSection(options: ContentSectionOptions) {
  return new ContentSection(options);
}
