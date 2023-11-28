import { DocumentSection, DocumentSectionOptions } from './section.js';
import { heading } from '../elements/heading.js';

type Content = string | Array<string>;

export interface ContentSectionOptions extends DocumentSectionOptions {
  content?: Content;
}

export class ContentSection extends DocumentSection {
  private content: Array<string> = [];

  constructor(options: ContentSectionOptions) {
    super(options);
    this.appendContent(options.content ?? '');
  }

  public appendContent(content: Content) {
    if (Array.isArray(content)) {
      this.content.push(...content);
    } else {
      this.content.push(content);
    }

    return this;
  }

  protected synthesizeContent(): Array<string> {
    const content = this.content.join('\n\n');
    return [heading(this.headingLevel, this.title), '', content];
  }
}

export function contentSection(options: ContentSectionOptions) {
  return new ContentSection(options);
}
