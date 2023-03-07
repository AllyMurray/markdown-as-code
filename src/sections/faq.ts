import { ListSection } from './list-section.js';

interface FrequentlyAskedQuestion {
  question: string;
  answer: string;
}

export class FAQ extends ListSection<FrequentlyAskedQuestion> {
  constructor(title?: string) {
    super(title ?? 'FAQ', 'None');
  }

  protected itemMapper(item: FrequentlyAskedQuestion): string {
    return [`#### ${item.question}`, '', item.answer].join('\n');
  }
}
