import fs from 'fs';
import { createMarkdownDocument } from './markdown.js';
import { Authors, authorsSection } from '../sections/authors.js';
import { ContentSection, contentSection } from '../sections/content-section.js';
import { Roadmap } from '../sections/roadmap.js';

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
    }).addSection(new Roadmap().add({ text: 'Item 1' }));

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection('Custom Section', 'Some markdown content');

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
    }).addSection(rootSection);

    markdownDoc.appendSection({
      path: ['Root Section', 'Sub Section'],
      update: (section: ContentSection) => {
        section.appendContent('Some more markdown sub content');
      },
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section with a sub-section 2', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection(
      contentSection({
        title: 'Root Section',
        content: 'Some markdown content',
      }).addSubSection(authorsSection().add({ githubUsername: 'jane-doe' }))
    );

    markdownDoc.appendSection({
      path: ['Root Section', 'Authors'],
      update: (section: Authors) => {
        section.add({ githubUsername: 'john-smith' });
      },
    });

    expect(markdownDoc.synthContent()).toMatchSnapshot();
  });

  it('should throw an error if a section is not found', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    }).addSection(
      contentSection({
        title: 'Root Section',
        content: 'Some markdown content',
      }).addSubSection(authorsSection().add({ githubUsername: 'jane-doe' }))
    );

    expect(() =>
      markdownDoc.appendSection({
        path: ['Root Section', 'Authors', 'John Smith'],
        update: (section: Authors) => {
          section.add({ githubUsername: 'john-smith' });
        },
      })
    ).toThrowError();
  });

  it('should write a document to disk', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.synth();

    expect(mockedFs.writeFileSync.mock.calls[0][0]).toContain(
      'markdown-as-code/test.md'
    );
    expect(mockedFs.writeFileSync.mock.calls[0][1]).toMatchSnapshot();
  });

  it('should throw an error if content is undefined', () => {
    const markdownDoc = createMarkdownDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    // Cast to string so it will compile
    const undefinedContent = undefined as unknown as string;

    expect(() =>
      markdownDoc.addSection('Custom Section', undefinedContent)
    ).toThrowError();
  });
});
