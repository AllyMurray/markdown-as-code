import { ContentSection } from './content-section.js';

export class Support extends ContentSection {
  constructor() {
    super('Support');
  }
}

export function supportSection() {
  return new Support();
}
