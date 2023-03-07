import { Authors } from './authors.js';

describe('Authors', () => {
  it('should return title only when no items are added', () => {
    const section = new Authors();
    expect(section.synthesize()).toBe('## Authors\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = new Authors().add({ githubUsername: 'JaneDoe' });
    expect(section.synthesize()).toBe(
      ['## Authors', '', '* [@JaneDoe](https://www.github.com/JaneDoe)'].join(
        '\n'
      )
    );
  });

  it('should return correct syntax when multiple items is added', () => {
    const section = new Authors()
      .add({ githubUsername: 'JaneDoe' })
      .add({ githubUsername: 'JohnSmith' });
    expect(section.synthesize()).toBe(
      [
        '## Authors',
        '',
        '* [@JaneDoe](https://www.github.com/JaneDoe)',
        '',
        '* [@JohnSmith](https://www.github.com/JohnSmith)',
      ].join('\n')
    );
  });
});
