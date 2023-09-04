import { createMarkdownDocument, ContentSection } from 'markdown-as-code';

const content = createMarkdownDocument({
  title: 'Test',
  fileName: 'test.md',
})
  .addSection(new ContentSection('Custom Section', 'Some markdown content'))
  .synthContent();
