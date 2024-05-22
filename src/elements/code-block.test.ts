import { codeBlock } from './code-block.js';

describe('codeBlock', () => {
  it('should return a code block with no language', () => {
    const exampleCode = 'const testNumber = 1';
    const expected = ['```', exampleCode, '```'].join('\n');
    expect(codeBlock({ code: exampleCode })).toBe(expected);
  });

  it('should return a code block with the provided language', () => {
    const exampleCode = 'const testNumber = 1';
    const expected = ['```typescript', exampleCode, '```'].join('\n');
    expect(codeBlock({ code: exampleCode, language: 'typescript' })).toBe(
      expected,
    );
  });

  it('should normalize the indentation of the code block', () => {
    const exampleCode = `
      function foo() {
        return 'bar';
      }
    `;
    expect(codeBlock({ language: 'typescript', code: exampleCode }))
      .toMatchInlineSnapshot(`
        "\`\`\`typescript
        function foo() {
          return 'bar';
        }
        \`\`\`"
      `);
  });
});
