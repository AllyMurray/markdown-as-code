import { contributingSection } from './contributing.js';

describe('contributing', () => {
  it('should return the correct markdown syntax using the default title', () => {
    expect(contributingSection().synthesize()).toBe(
      [
        '## Contributing',
        'Contributions are always welcome!',
        'See `contributing.md` for ways to get started.',
        "Please adhere to this project's `code of conduct`.",
      ].join('\n\n'),
    );
  });

  it('should return the correct markdown syntax using a custom title', () => {
    expect(
      contributingSection({ title: 'Custom Contributing' }).synthesize(),
    ).toBe(
      [
        '## Custom Contributing',
        'Contributions are always welcome!',
        'See `contributing.md` for ways to get started.',
        "Please adhere to this project's `code of conduct`.",
      ].join('\n\n'),
    );
  });

  it('should return the correct markdown syntax using custom content', () => {
    expect(
      contributingSection({
        content: 'Custom Content',
      }).synthesize(),
    ).toBe(
      [
        '## Contributing',
        'Contributions are always welcome!',
        'See `contributing.md` for ways to get started.',
        "Please adhere to this project's `code of conduct`.",
        'Custom Content',
      ].join('\n\n'),
    );
  });

  it('should return the correct markdown syntax using array of custom content', () => {
    expect(
      contributingSection({
        content: ['Custom Content 1', 'Custom Content 2'],
      }).synthesize(),
    ).toBe(
      [
        '## Contributing',
        'Contributions are always welcome!',
        'See `contributing.md` for ways to get started.',
        "Please adhere to this project's `code of conduct`.",
        'Custom Content 1',
        'Custom Content 2',
      ].join('\n\n'),
    );
  });
});
