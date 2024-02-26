import { markdownDocument } from './markdown-document.js';
import { Authors, authorsSection } from './sections/authors.js';
import { contentSection } from './sections/content-section.js';
import { roadmapSection } from './sections/roadmap.js';

describe('Markdown Document', () => {
  it('should synthesize a basic document', () => {
    const markdownDoc = markdownDocument({
      title: 'Test',
    });

    expect(markdownDoc.toString()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a section', () => {
    const markdownDoc = markdownDocument({
      title: 'Test',
    }).addSection(roadmapSection({ items: [{ text: 'Item 1' }] }));

    expect(markdownDoc.toString()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section with a sub-section by setting rootSection', () => {
    const rootSection = contentSection({
      title: 'Root Section',
      content: 'Some markdown content',
    });

    contentSection({
      title: 'Sub Section',
      content: 'Some markdown sub content',
      parent: rootSection,
    });

    const markdownDoc = markdownDocument({
      title: 'Test',
      content: [rootSection],
    });

    expect(markdownDoc.toString()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section with a sub-section by using addSubSection', () => {
    const markdownDoc = markdownDocument({
      title: 'Test',
    }).addSection(
      contentSection({
        title: 'Root Section',
        content: 'Some markdown content',
      }).addSubSection(authorsSection().add({ githubUsername: 'jane-doe' })),
    );

    expect(markdownDoc.toString()).toMatchSnapshot();
  });

  it('should find a section by path', () => {
    const markdownDoc = markdownDocument({
      title: 'Test',
    });

    markdownDoc.addSection(
      authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    );

    const authorsSectionFromPath = markdownDoc.tryFindSection(['Authors']);

    expect(authorsSectionFromPath).toBeInstanceOf(Authors);
  });

  it('should return undefined when section is not found by path', () => {
    const markdownDoc = markdownDocument({
      title: 'Test',
    });

    markdownDoc.addSection(
      authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    );

    const authorsSectionFromPath = markdownDoc.tryFindSection(['Unknown']);

    expect(authorsSectionFromPath).toBeUndefined();
  });
});
