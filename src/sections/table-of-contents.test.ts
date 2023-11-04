import { Section } from './factory.js';
import { DocumentSection, DocumentSectionOptions } from './section.js';
import { tableOfContentsSection } from './table-of-contents.js';

const createTestSection = (options: DocumentSectionOptions): Section => {
  class TestDocumentSection extends DocumentSection {
    protected synthesizeContent(): string[] {
      return [this.title];
    }
  }

  return new TestDocumentSection(options) as unknown as Section;
};

describe('table of contents', () => {
  it('should create a section with the title Table of Contents', () => {
    expect(
      tableOfContentsSection({
        sections: [createTestSection({ title: 'Test Section' })],
      }).title,
    ).toBe('Table of Contents');
  });

  it('should return the correct syntax for the title and table of contents', () => {
    const tableOfContents = tableOfContentsSection({
      sections: [createTestSection({ title: 'Test Section' })],
    });

    expect(tableOfContents.synthesize()).toBe(
      ['## Table of Contents', '', '- [Test Section](#test-section)'].join(
        '\n',
      ),
    );
  });

  it('should return the correct syntax for the title and table of contents with multiple sections', () => {
    const tableOfContents = tableOfContentsSection({
      sections: [
        createTestSection({ title: 'Test Section' }),
        createTestSection({ title: 'Test Section 2' }),
      ],
    });

    expect(tableOfContents.synthesize()).toBe(
      [
        '## Table of Contents',
        '',
        '- [Test Section](#test-section)',
        '- [Test Section 2](#test-section-2)',
      ].join('\n'),
    );
  });

  it('should return the correct syntax for the title and table of contents with root and sub sections', () => {
    const rootSection = createTestSection({ title: 'Root Section' });
    createTestSection({
      title: 'Sub Section',
      parent: rootSection,
    });

    const tableOfContents = tableOfContentsSection({
      sections: [rootSection],
    });

    expect(tableOfContents.synthesize()).toBe(
      [
        '## Table of Contents',
        '',
        '- [Root Section](#root-section)',
        '  - [Sub Section](#sub-section)',
      ].join('\n'),
    );
  });
});
