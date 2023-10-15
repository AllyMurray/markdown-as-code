import { link } from './link.js';

describe('link', () => {
  it('should return the correct syntax for a link', () => {
    expect(link('GitHub Pages', 'https://pages.github.com')).toBe(
      '[GitHub Pages](https://pages.github.com)'
    );
  });
});
