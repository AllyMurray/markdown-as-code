import { tableOfContentsSection, contentSection } from 'markdown-as-code';

const content = tableOfContentsSection({
  sections: [contentSection('Test Section')],
}).synthesize();
