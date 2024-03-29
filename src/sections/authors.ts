import { type ListOptions, ListSection } from './list-section.js';
import { link } from '../elements/link.js';
import { mentionPerson } from '../elements/mention.js';

interface Author {
  githubUsername: string;
}

export interface AuthorsOptions extends Partial<ListOptions<Author>> {}

export class Authors extends ListSection<Author> {
  constructor(options?: AuthorsOptions) {
    super({
      title: options?.title ?? 'Authors',
      type: 'Unordered',
      ...options,
    });
  }

  protected itemMapper(author: Author): string {
    return link(
      mentionPerson(author.githubUsername),
      new URL(author.githubUsername, 'https://www.github.com').toString(),
    );
  }
}

export function authorsSection(options?: AuthorsOptions) {
  return new Authors(options);
}
