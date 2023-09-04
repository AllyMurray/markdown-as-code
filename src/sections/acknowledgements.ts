import { ListSection } from './list-section.js';
import { link } from '../syntax/link.js';

interface Link {
  text: string;
  url: string;
}

export class Acknowledgements extends ListSection<Link> {
  constructor(title?: string) {
    super(title ?? 'Acknowledgements', 'Unordered');
  }

  protected itemMapper({ text, url }: Link): string {
    return link(text, url);
  }
}

export function acknowledgementsSection(title?: string) {
  return new Acknowledgements(title);
}
