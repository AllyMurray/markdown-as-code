import { ContentSection } from './content-section.js';
import { DocumentSectionOptions } from './section.js';
import type { Optional } from '../@types/optional.js';

export interface ContributingOptions
  extends Optional<DocumentSectionOptions, 'title'> {
  content?: string | Array<string>;
}

export class Contributing extends ContentSection {
  constructor(options?: ContributingOptions) {
    const content = [
      'Contributions are always welcome!',
      'See `contributing.md` for ways to get started.',
      "Please adhere to this project's `code of conduct`.",
    ];

    if (options?.content) {
      if (Array.isArray(options.content)) {
        content.push(...options.content);
      } else {
        content.push(options.content);
      }
    }

    super({
      title: options?.title ?? 'Contributing',
      ...options,
      content: content.join('\n\n'),
    });
  }
}

export function contributingSection(options?: ContributingOptions) {
  return new Contributing(options);
}
