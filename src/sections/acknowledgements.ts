import { ListOptions, ListSection } from './list-section.js';
import { link } from '../syntax/link.js';

export interface AcknowledgementOptions extends Partial<ListOptions> {}

interface Link {
  text: string;
  url: string;
}

export class Acknowledgements extends ListSection<Link> {
  constructor(options?: AcknowledgementOptions) {
    super({
      title: options?.title ?? 'Acknowledgements',
      type: 'Unordered',
      ...options,
    });
  }

  protected itemMapper({ text, url }: Link): string {
    return link(text, url);
  }
}

export function acknowledgementsSection(options?: AcknowledgementOptions) {
  return new Acknowledgements(options);
}
