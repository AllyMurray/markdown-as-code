import { DocumentSection } from './section.js';
import { TableOfContentsSection } from './table-of-contents.js';

class TestDocumentSection extends DocumentSection {
  protected synthesizeContent(): string[] {
    return [this.title];
  }
}

describe('table of contents', () => {
  it('should create a section with the title Table of Contents', () => {
    expect(
      new TableOfContentsSection({
        sections: [new TestDocumentSection('Test Section')],
      }).title
    ).toBe('Table of Contents');
  });

  it('should return the correct syntax for the title and table of contents', () => {
    const tableOfContents = new TableOfContentsSection({
      sections: [new TestDocumentSection('Test Section')],
    });

    expect(tableOfContents.synthesize()).toBe(
      ['## Table of Contents', '', '- [Test Section](#test-section)'].join('\n')
    );
  });
});
