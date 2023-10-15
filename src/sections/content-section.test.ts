import { ContentSection, contentSection } from './content-section.js';

describe('Content Section', () => {
  it('should return the correct markdown syntax with no content', () => {
    expect(contentSection({ title: 'Test Section' }).synthesize()).toBe(
      '## Test Section\n\n',
    );
  });

  it('should return the correct markdown syntax with content', () => {
    expect(
      contentSection({
        title: 'Test Section',
        content: 'Custom Content!',
      }).synthesize(),
    ).toBe(['## Test Section', '', 'Custom Content!'].join('\n'));
  });

  it('should allow adding additional content', () => {
    expect(
      contentSection({ title: 'Test Section', content: 'Custom Content!' })
        .appendContent('More Content')
        .synthesize(),
    ).toBe(
      ['## Test Section', '', 'Custom Content!', '', 'More Content'].join('\n'),
    );
  });
});

describe('createContentSection', () => {
  it('should return an instance of ContentSection', () => {
    expect(contentSection({ title: 'Test Section' })).toBeInstanceOf(
      ContentSection,
    );
  });
});
