import { Contributing } from './contributing.js';

describe('contributing', () => {
  it('should return the correct markdown syntax using the default title', () => {
    expect(new Contributing().synthesize()).toBe(
      [
        '## Contributing',
        'Contributions are always welcome!',
        'See `contributing.md` for ways to get started.',
        "Please adhere to this project's `code of conduct`.",
      ].join('\n\n')
    );
  });

  it('should return the correct markdown syntax using a custom default title', () => {
    expect(new Contributing('Custom Contributing').synthesize()).toBe(
      [
        '## Custom Contributing',
        'Contributions are always welcome!',
        'See `contributing.md` for ways to get started.',
        "Please adhere to this project's `code of conduct`.",
      ].join('\n\n')
    );
  });
});
