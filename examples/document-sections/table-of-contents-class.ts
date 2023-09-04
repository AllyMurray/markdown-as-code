import { TableOfContentsSection, ContentSection } from 'markdown-as-code';

const content = new TableOfContentsSection({
  sections: [new ContentSection('Test Section')],
}).synthesize();
