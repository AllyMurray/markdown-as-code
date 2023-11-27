import { ContentSection } from './content-section.js';

export interface AppendixOptions {
  content?: string;
}

export class Appendix extends ContentSection {
  constructor(options: AppendixOptions) {
    super({ title: 'Appendix', ...options });
  }
}

export function appendixSection(options: AppendixOptions) {
  return new Appendix(options);
}
