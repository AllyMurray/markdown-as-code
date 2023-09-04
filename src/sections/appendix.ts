import { ContentSection } from './content-section.js';

export class Appendix extends ContentSection {
  constructor() {
    super('Appendix');
  }
}

export function appendixSection() {
  return new Appendix();
}
