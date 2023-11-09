import fs from 'fs';
import { createMarkdownDocument } from './markdown.js';
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

  it('should synthesize a document after adding a custom section with a sub-section', () => {
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

    markdownDoc.appendSection({
      path: ['Root Section', 'Sub Section'],
      type: 'content',
      onAppend: (section) => {
        section.appendContent('Some more markdown sub content');
      },
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section with a sub-section 2', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection({
      section: contentSection({
        title: 'Root Section',
        content: 'Some markdown content',
      }).addSubSection(authorsSection().add({ githubUsername: 'jane-doe' })),
    });

    markdownDoc.appendSection({
      path: ['Root Section', 'Authors'],
      type: 'authors',
      onAppend: (section: Authors) => {
        section.add({ githubUsername: 'john-smith' });
      },
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should throw an error if a section is not found', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection({
      section: contentSection({
        title: 'Root Section',
        content: 'Some markdown content',
      }).addSubSection(authorsSection().add({ githubUsername: 'jane-doe' })),
    });

    expect(() =>
      markdownDoc.appendSection({
        path: ['Root Section', 'Authors', 'John Smith'],
        type: 'authors',
        onAppend: (section) => {
          section.add({ githubUsername: 'john-smith' });
        },
      }),
    ).toThrowError();
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

  it('should synthesize a document after adding a custom section with a sub-section', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.createSection({
      type: 'acknowledgements',
      sortOrder: 1,
      onCreate: (section) => {
        section.add({
          text: 'Some more markdown sub content',
          url: 'http://example.com',
        });
      },
    });

    markdownDoc.appendSection({
      path: ['Acknowledgements'],
      type: 'acknowledgements',
      onAppend: (section) => {
        section.add({
          text: 'Some more markdown sub content',
          url: 'http://example.com',
        });
      },
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should increment the sort order when adding a section', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.createSection({
      type: 'acknowledgements',
      sortOrder: 1,
      onCreate: (section) => {
        section.add({
          text: 'Some more markdown sub content',
          url: 'http://example.com',
        });
      },
    });

    markdownDoc.createSection({
      type: 'authors',
      sortOrder: 1,
      onCreate: (section) => {
        section.add({
          githubUsername: 'john-smith',
        });
      },
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

    markdownDoc.createSection({
      type: 'authors',
      sortOrder: 3,
      onCreate: (section) => {
        section.add({
          githubUsername: 'john-smith',
        });
      },
    });

    markdownDoc.createSection({
      type: 'acknowledgements',
      sortOrder: 1,
      onCreate: (section) => {
        section.add({
          text: 'Some more markdown sub content',
          url: 'http://example.com',
        });
      },
    });

    markdownDoc.createSection({
      type: 'roadmap',
      sortOrder: 4,
      onCreate: (section) => {
        section.add({
          text: 'Some more markdown sub content',
        });
      },
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
});
