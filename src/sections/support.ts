import { ContentSection } from './content-section.js';

export class Support extends ContentSection {
  constructor() {
    super({ title: 'Support' });
  }
}

export function supportSection() {
  return new Support();
}
