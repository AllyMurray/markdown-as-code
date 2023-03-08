import { ListSection } from './list-section.js';
import { heading } from '../index.js';

interface CodeBlock {
  language:
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

interface Example {
  title: string;
  description?: string;
  codeblock: CodeBlock;
}

export class Examples extends ListSection<Example> {
  constructor() {
    super('Examples', 'None');
  }

  protected itemMapper(item: Example): string {
    return [
      heading(4, item.title),
      ...(item.description ? ['', item.description, ''] : ['']),
      `\`\`\`${item.codeblock.language}`,
      item.codeblock.code,
      '```',
    ].join('\n');
  }
}
