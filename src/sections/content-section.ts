import { DocumentSection, DocumentSectionOptions } from './section.js';
import { heading } from '../elements/heading.js';

type Content = string | Array<string>;

interface ContentSectionOptions extends DocumentSectionOptions {
  content?: Content;
}

export class ContentSection extends DocumentSection {
  private content: Content;

  constructor(options: ContentSectionOptions) {
    super(options);
    this.content = options.content ?? '';
  }

  public appendContent(content: Content) {
    this.content = this.content
      ? [this.content, '', content].join('\n')
      : content;
    return this;
  }

  protected synthesizeContent(): Array<string> {
    const content = Array.isArray(this.content)
      ? this.content.join('\n\n')
      : this.content;

    return [heading(this.headingLevel, this.title), '', content];
  }
}

export function contentSection(options: ContentSectionOptions) {
  return new ContentSection(options);
}
