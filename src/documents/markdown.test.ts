import fs from 'fs';
import { createMarkdownDocument } from './markdown.js';
import { Roadmap } from '../sections/roadmap.js';

jest.mock('fs');
const mockedFs = jest.mocked(fs);

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
