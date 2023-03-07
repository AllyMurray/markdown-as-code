import { ListSection } from './list-section.js';
import { link } from '../index.js';
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