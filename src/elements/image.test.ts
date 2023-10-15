import { image } from './image.js';

describe('image', () => {
  it('should return the correct syntax for an image', () => {
    expect(
      image(
        'https://myoctocat.com/assets/images/base-octocat.svg',
        'GitHub Octocat',
      ),
    ).toBe(
      '![GitHub Octocat](https://myoctocat.com/assets/images/base-octocat.svg)',
    );
  });
});
