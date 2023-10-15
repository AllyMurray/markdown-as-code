import { examplesSection } from './examples.js';

describe('Examples', () => {
  it('should return title only when no items are added', () => {
    const section = examplesSection();
    expect(section.synthesize()).toBe('## Examples');
  });

  it('should return correct syntax when one item is added', () => {
    const section = examplesSection().add({
      title: 'Create an example section',
      description:
        'The title is defaulted to Examples but can be overridden in the constructor',
      codeblock: {
        language: 'typescript',
        code: 'const section = examplesSection();',
      },
    });
    expect(section.synthesize()).toBe(
      [
        '## Examples',
        '',
        '### Create an example section',
        '',
        'The title is defaulted to Examples but can be overridden in the constructor',
        '',
        '```typescript',
        'const section = examplesSection();',
        '```',
        '',
      ].join('\n'),
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = examplesSection()
      .add({
        title: 'Create an example section',
        description:
          'The title is defaulted to Examples but can be overridden in the constructor',
        codeblock: {
          language: 'typescript',
          code: 'const section = examplesSection();',
        },
      })
      .add({
        title: 'Create an example section',
        description:
          'The title is defaulted to Examples but can be overridden in the constructor',
        codeblock: {
          language: 'typescript',
          code: 'const section = examplesSection();',
        },
      });
    expect(section.synthesize()).toBe(
      [
        '## Examples',
        '',
        '### Create an example section',
        '',
        'The title is defaulted to Examples but can be overridden in the constructor',
        '',
        '```typescript',
        'const section = examplesSection();',
        '```',
        '',
        '### Create an example section',
        '',
        'The title is defaulted to Examples but can be overridden in the constructor',
        '',
        '```typescript',
        'const section = examplesSection();',
        '```',
        '',
      ].join('\n'),
    );
  });

  it('should return correct syntax when the example has no description', () => {
    const section = examplesSection().add({
      title: 'Create an example section',
      codeblock: {
        language: 'typescript',
        code: 'const section = examplesSection();',
      },
    });
    expect(section.synthesize()).toBe(
      [
        '## Examples',
        '',
        '### Create an example section',
        '',
        '```typescript',
        'const section = examplesSection();',
        '```',
        '',
      ].join('\n'),
    );
  });

  it('should return correct syntax when examples are grouped', () => {
    const section = examplesSection()
      .add({
        title: 'Ungrouped Example',
        codeblock: {
          language: 'typescript',
          code: 'const section = examplesSection();',
        },
      })
      .add({
        title: 'Grouped Example',
        group: 'Group 1',
        codeblock: {
          language: 'typescript',
          code: 'const section = examplesSection();',
        },
      });
    expect(section.synthesize()).toMatchInlineSnapshot(`
      "## Examples

      ### Ungrouped Example

      \`\`\`typescript
      const section = examplesSection();
      \`\`\`


      ### Group 1

      #### Grouped Example

      \`\`\`typescript
      const section = examplesSection();
      \`\`\`
      "
    `);
  });
});
