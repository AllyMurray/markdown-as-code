import { type ListOptions, ListSection } from './list-section.js';
import { HeadingLevel, heading } from '../elements/heading.js';

interface FrequentlyAskedQuestion {
  question: string;
  answer: string;
}

export interface FAQOptions extends Partial<ListOptions> {}

export class FAQ extends ListSection<FrequentlyAskedQuestion> {
  constructor(options?: FAQOptions) {
    super({ title: options?.title ?? 'FAQ', type: 'None', ...options });
  }

  protected itemMapper(item: FrequentlyAskedQuestion): string {
    const maximumHeadingLevel = 6;
    let headingLevel = this.headingLevel + 2;
    headingLevel =
      headingLevel > maximumHeadingLevel ? maximumHeadingLevel : headingLevel;
    return [
      heading(headingLevel as HeadingLevel, item.question),
      '',
      item.answer,
    ].join('\n');
  }
}

export function faqSection(options?: FAQOptions) {
  return new FAQ(options);
}
