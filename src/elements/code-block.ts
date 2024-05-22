interface CodeBlock {
  language?:
    | 'apache'
    | 'armasm'
    | 'bash'
    | 'c'
    | 'coffeescript'
    | 'cpp'
    | 'csharp'
    | 'css'
    | 'd'
    | 'diff'
    | 'go'
    | 'handlebars'
    | 'haskell'
    | 'http'
    | 'ini'
    | 'java'
    | 'javascript'
    | 'json'
    | 'julia'
    | 'kotlin'
    | 'less'
    | 'lua'
    | 'makefile'
    | 'markdown'
    | 'nginx'
    | 'objectivec'
    | 'perl'
    | 'php'
    | 'plaintext'
    | 'properties'
    | 'python'
    | 'r'
    | 'ruby'
    | 'rust'
    | 'scala'
    | 'scss'
    | 'shell'
    | 'sql'
    | 'swift'
    | 'typescript'
    | 'x86asm'
    | 'xml'
    | 'yaml';
  code: string;
}

export const codeBlock = ({ language, code }: CodeBlock) => {
  // Remove the new line at the start of the code block
  const newCode = code.replace(/^\n/, '');

  // Get the whitespace from the first line
  const match = newCode.match(/^(\s+)/);
  const whitespace = match ? match[1] : '';

  // Decrease code indentation by the length of the whitespace from the first line
  const lines = newCode
    .trim()
    .split('\n')
    .map((line) => line.replace(whitespace, ''));

  return [`\`\`\`${language ?? ''}`, lines.join('\n'), '```'].join('\n');
};
