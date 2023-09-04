// import { ListSection } from './list-section.js';
import { DocumentSection } from './section.js';
import { heading } from '../syntax/heading.js';

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
  group?: string;
}

export class Examples extends DocumentSection {
  protected items = new Map<string, Array<Example>>();

  constructor() {
    super('Examples');
  }

  public add(item: Example) {
    const group = this.items.get(item.group ?? 'ungrouped');

    if (group) {
      group.push(item);
    } else {
      this.items.set(item.group ?? 'ungrouped', [item]);
    }

    return this;
  }

  protected itemMapper(item: Example): string {
    return [
      heading(4, item.title),
      ...(item.description ? ['', item.description, ''] : ['']),
      `\`\`\`${item.codeblock.language}`,
      item.codeblock.code.replace(/\n$/, ''),
      '```',
      '',
    ].join('\n');
  }

  protected synthesizeContent(): Array<string> {
    const content = [heading(2, this.title)];

    for (const [group, examples] of this.items) {
      content.push('');
      if (group !== 'ungrouped') {
        content.push(heading(3, group), '');
      }
      content.push(...examples.map(this.itemMapper));
    }

    return content;
  }
}
