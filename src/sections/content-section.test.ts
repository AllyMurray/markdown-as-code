import { ContentSection, createContentSection } from './content-section.js';

describe('Content Section', () => {
  it('should return the correct markdown syntax with no content', () => {
    expect(new ContentSection('Test Section').synthesize()).toBe(
      '## Test Section\n\n'
    );
  });

  it('should return the correct markdown syntax with content', () => {
    expect(
      new ContentSection('Test Section', 'Custom Content!').synthesize()
    ).toBe(['## Test Section', '', 'Custom Content!'].join('\n'));
  });

  it('should allow adding additional content', () => {
    expect(
      new ContentSection('Test Section', 'Custom Content!')
        .appendContent('More Content')
        .synthesize()
    ).toBe(
      ['## Test Section', '', 'Custom Content!', '', 'More Content'].join('\n')
    );
  });
});

describe('createContentSection', () => {
  it('should return an instance of ContentSection', () => {
    expect(createContentSection('Test Section')).toBeInstanceOf(ContentSection);
  });
});
