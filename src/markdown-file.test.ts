import fs from 'fs';
import { markdownFile } from './markdown-file.js';
import { Authors, authorsSection } from './sections/authors.js';
import { contentSection } from './sections/content-section.js';
import { roadmapSection } from './sections/roadmap.js';

vi.mock('fs');
const mockedFs = vi.mocked(fs);

describe('Markdown File', () => {
  it('should synthesize a basic document', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
    });

    expect(markdownDoc.toString()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a section', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
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

    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
      content: [rootSection],
    });

    expect(markdownDoc.toString()).toMatchSnapshot();
  });

  it('should synthesize a document after adding a custom section with a sub-section by using addSubSection', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
    }).addSection(
      contentSection({
        title: 'Root Section',
        content: 'Some markdown content',
      }).addSubSection(authorsSection().add({ githubUsername: 'jane-doe' })),
    );

    expect(markdownDoc.toString()).toMatchSnapshot();
  });

  it('should write a document to disk', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.toFile();

    expect(mockedFs.writeFileSync.mock.calls[0][0]).toContain(
      'markdown-as-code/test.md',
    );
    expect(mockedFs.writeFileSync.mock.calls[0][1]).toMatchSnapshot();
  });

  it('should find a section by path', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.addSection(
      authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    );

    const authorsSectionFromPath = markdownDoc.tryFindSection(['Authors']);

    expect(authorsSectionFromPath).toBeInstanceOf(Authors);
  });

  it('should return undefined when section is not found by path', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.addSection(
      authorsSection({ items: [{ githubUsername: 'john-smith' }] }),
    );

    const authorsSectionFromPath = markdownDoc.tryFindSection(['Unknown']);

    expect(authorsSectionFromPath).toBeUndefined();
  });

  it('should return the file name', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
    });

    expect(markdownDoc.fileName).toBe('test.md');
  });

  it('should return the out dir', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
      outDir: 'lib',
    });

    expect(markdownDoc.outDir).toBe('lib');
  });

  it('should return the full file path', () => {
    const markdownDoc = markdownFile({
      title: 'Test',
      fileName: 'test.md',
      outDir: 'lib',
    });

    expect(markdownDoc.fullFilePath).toBe('lib/test.md');
  });
});
