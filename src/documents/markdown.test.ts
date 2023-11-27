import fs from 'fs';
import { createMarkdownDocument } from './markdown.js';
import { acknowledgementsSection } from '../sections/acknowledgements.js';
import { Authors, authorsSection } from '../sections/authors.js';
import { contentSection } from '../sections/content-section.js';
import { roadmapSection } from '../sections/roadmap.js';

vi.mock('fs');
const mockedFs = vi.mocked(fs);

describe('Markdown Document', () => {
  it('should synthesize a basic document', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a section', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection({ section: roadmapSection().add({ text: 'Item 1' }) });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
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

    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection({ section: rootSection });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section with a sub-section by using addSubSection', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection({
      section: contentSection({
        title: 'Root Section',
        content: 'Some markdown content',
      }).addSubSection(authorsSection().add({ githubUsername: 'jane-doe' })),
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should write a document to disk', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.synth();

    expect(mockedFs.writeFileSync.mock.calls[0][0]).toContain(
      'markdown-as-code/test.md',
    );
    expect(mockedFs.writeFileSync.mock.calls[0][1]).toMatchSnapshot();
  });

  it('should increment the sort order when adding a section', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.addSection({
      sortOrder: 1,
      section: acknowledgementsSection({
        items: [
          {
            text: 'Some more markdown sub content',
            url: 'http://example.com',
          },
        ],
      }),
    });

    markdownDoc.addSection({
      sortOrder: 1,
      section: authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    });

    const authorsSectionContent = markdownDoc.synthContent();
    const indexOfAuthors = authorsSectionContent.indexOf('## Authors');
    const indexOfAcknowledgements = authorsSectionContent.indexOf(
      '## Acknowledgements',
    );

    expect(indexOfAuthors).toBeLessThan(indexOfAcknowledgements);
  });

  it('should not increment the sort order when there is a gap in the sort order', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.addSection({
      sortOrder: 3,
      section: authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    });

    markdownDoc.addSection({
      sortOrder: 1,
      section: acknowledgementsSection({
        items: [
          {
            text: 'Some more markdown sub content',
            url: 'http://example.com',
          },
        ],
      }),
    });

    markdownDoc.addSection({
      sortOrder: 4,
      section: roadmapSection({ items: ['Some more markdown sub content'] }),
    });

    const authorsSectionContent = markdownDoc.synthContent();
    const indexOfAuthors = authorsSectionContent.indexOf('## Authors');
    const indexOfAcknowledgements = authorsSectionContent.indexOf(
      '## Acknowledgements',
    );
    const indexOfRoadmap = authorsSectionContent.indexOf('## Roadmap');
    const isCorrectSortOrder =
      indexOfAcknowledgements < indexOfAuthors &&
      indexOfAuthors < indexOfRoadmap;

    expect(isCorrectSortOrder).toBe(true);
  });

  it('should find a section by path', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.addSection({
      section: authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    });

    const authorsSectionFromPath = markdownDoc.tryFindSection(['Authors']);

    expect(authorsSectionFromPath).toBeInstanceOf(Authors);
  });

  it('should return undefined when section is not found by path', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.addSection({
      section: authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    });

    const authorsSectionFromPath = markdownDoc.tryFindSection(['Unknown']);

    expect(authorsSectionFromPath).toBeUndefined();
  });
});
