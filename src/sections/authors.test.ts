import { authorsSection } from './authors.js';

describe('Authors', () => {
  it('should return title only when no items are added', () => {
    const section = authorsSection();
    expect(section.synthesize()).toBe('## Authors\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = authorsSection().add({ githubUsername: 'JaneDoe' });
    expect(section.synthesize()).toBe(
      ['## Authors', '', '- [@JaneDoe](https://www.github.com/JaneDoe)'].join(
        '\n',
      ),
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = authorsSection()
      .add({ githubUsername: 'JaneDoe' })
      .add({ githubUsername: 'JohnSmith' });
    expect(section.synthesize()).toBe(
      [
        '## Authors',
        '',
        '- [@JaneDoe](https://www.github.com/JaneDoe)',
        '',
        '- [@JohnSmith](https://www.github.com/JohnSmith)',
      ].join('\n'),
    );
  });

  it('should allow for custom titles', () => {
    const section = authorsSection({ title: 'Custom Title' });
    expect(section.synthesize()).toBe('## Custom Title\n\n');
  });
});
