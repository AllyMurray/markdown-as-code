import fs from 'fs';
import { createMarkdownDocument } from './markdown.js';
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
    })
      .addSection(rootSection)
      .appendSection({
        path: ['Root Section', 'Sub Section'],
        updater: (section: ContentSection) => {
          section.appendContent('Some more markdown sub content');
        },
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
