import { Examples } from './examples.js';

describe('Examples', () => {
  it('should return title only when no items are added', () => {
    const section = new Examples();
    expect(section.synthesize()).toBe('## Examples');
  });

  it('should return correct syntax when one item is added', () => {
    const section = new Examples().add({
      title: 'Create an example section',
      description:
        'The title is defaulted to Examples but can be overridden in the constructor',
      codeblock: {
        language: 'typescript',
        code: 'const section = new Examples();',
      },
    });
    expect(section.synthesize()).toBe(
      [
        '## Examples',
        '',
        '#### Create an example section',
        '',
        'The title is defaulted to Examples but can be overridden in the constructor',
        '',
        '```typescript',
        'const section = new Examples();',
        '```',
        '',
      ].join('\n')
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = new Examples()
      .add({
        title: 'Create an example section',
        description:
          'The title is defaulted to Examples but can be overridden in the constructor',
        codeblock: {
          language: 'typescript',
          code: 'const section = new Examples();',
        },
      })
      .add({
        title: 'Create an example section',
        description:
          'The title is defaulted to Examples but can be overridden in the constructor',
        codeblock: {
          language: 'typescript',
          code: 'const section = new Examples();',
        },
      });
    expect(section.synthesize()).toBe(
      [
        '## Examples',
        '',
        '#### Create an example section',
        '',
        'The title is defaulted to Examples but can be overridden in the constructor',
        '',
        '```typescript',
        'const section = new Examples();',
        '```',
        '',
        '#### Create an example section',
        '',
        'The title is defaulted to Examples but can be overridden in the constructor',
        '',
        '```typescript',
        'const section = new Examples();',
        '```',
        '',
      ].join('\n')
    );
  });

  it('should return correct syntax when the example has no description', () => {
    const section = new Examples().add({
      title: 'Create an example section',
      codeblock: {
        language: 'typescript',
        code: 'const section = new Examples();',
      },
    });
    expect(section.synthesize()).toBe(
      [
        '## Examples',
        '',
        '#### Create an example section',
        '',
        '```typescript',
        'const section = new Examples();',
        '```',
        '',
      ].join('\n')
    );
  });
});
