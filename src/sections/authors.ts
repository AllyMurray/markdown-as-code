import { ListSection } from './list-section.js';
import { link } from '../syntax/link.js';
import { mentionPerson } from '../syntax/mention.js';

interface Author {
  githubUsername: string;
}

export class Authors extends ListSection<Author> {
  constructor(title?: string) {
    super(title ?? 'Authors', 'Unordered');
  }

  protected itemMapper(author: Author): string {
    return link(
      mentionPerson(author.githubUsername),
      new URL(author.githubUsername, 'https://www.github.com').toString()
    );
  }
}

export function authorsSection(title?: string) {
  return new Authors(title);
}
