import { DocumentSection } from './section.js';

export class ContentSection extends DocumentSection {
  constructor(public title: string, private content: string = '') {
    super(title);
  }

  public appendContent(content: string) {
    this.content = this.content
      ? [this.content, '', content].join('\n')
      : content;
    return this;
  }

  protected synthesizeContent(): Array<string> {
    return [`## ${this.title}`, '', this.content];
  }
}

export function contentSection(title: string, content: string = '') {
  return new ContentSection(title, content);
}
