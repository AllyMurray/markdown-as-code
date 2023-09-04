import { ContentSection } from './content-section.js';

export class Contributing extends ContentSection {
  constructor(title?: string) {
    const content = [
      'Contributions are always welcome!',
      '',
      'See `contributing.md` for ways to get started.',
      '',
      "Please adhere to this project's `code of conduct`.",
    ].join('\n');

    super(title ?? 'Contributing', content);
  }
}

export function contributingSection(title?: string) {
  return new Contributing(title);
}
