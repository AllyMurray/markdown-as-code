import { createReadmeDocument, ContentSection } from 'markdown-as-code';

const content = createReadmeDocument({
  title: 'Test',
  fileName: 'test.md',
})
  .addSection(new ContentSection('Custom Section', 'Some markdown content'))
  .synthContent();
