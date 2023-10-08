import { ContentSection } from './content-section.js';
import { DocumentSectionOptions } from './section.js';

export interface ContributingOptions extends DocumentSectionOptions {}

export class Contributing extends ContentSection {
  constructor(options?: ContributingOptions) {
    const content = [
      'Contributions are always welcome!',
      '',
      'See `contributing.md` for ways to get started.',
      '',
      "Please adhere to this project's `code of conduct`.",
    ].join('\n');

    super({ title: options?.title ?? 'Contributing', content, ...options });
  }
}

export function contributingSection(options?: ContributingOptions) {
  return new Contributing(options);
}
