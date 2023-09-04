import { DocumentSection } from './section.js';
import { tableOfContentsSection } from './table-of-contents.js';

class TestDocumentSection extends DocumentSection {
  protected synthesizeContent(): string[] {
    return [this.title];
  }
}

describe('table of contents', () => {
  it('should create a section with the title Table of Contents', () => {
    expect(
      tableOfContentsSection({
        sections: [new TestDocumentSection('Test Section')],
      }).title
    ).toBe('Table of Contents');
  });

  it('should return the correct syntax for the title and table of contents', () => {
    const tableOfContents = tableOfContentsSection({
      sections: [new TestDocumentSection('Test Section')],
    });

    expect(tableOfContents.synthesize()).toBe(
      ['## Table of Contents', '', '- [Test Section](#test-section)'].join('\n')
    );
  });
});
