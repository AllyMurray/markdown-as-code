import { ContentSection } from './content-section.js';

export interface SupportOptions {
  content?: string;
}

export class Support extends ContentSection {
  constructor(options: SupportOptions) {
    super({ title: 'Support', ...options });
  }
}

export function supportSection(options: SupportOptions) {
  return new Support(options);
}
