import { DocumentSection, DocumentSectionOptions } from './section.js';
import { HeadingLevel, heading } from '../elements/heading.js';

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

export interface ExamplesOptions extends DocumentSectionOptions {
  items: Array<Example>;
}
export class Examples extends DocumentSection {
  protected items = new Map<string, Array<Example>>();

  constructor(options?: ExamplesOptions) {
    super({ title: options?.title ?? 'Examples', ...options });
    options?.items.forEach((item) => this.add(item));
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

  protected itemMapper(item: Example, headingLevel: HeadingLevel): string {
    return [
      heading(headingLevel, item.title),
      ...(item.description ? ['', item.description, ''] : ['']),
      `\`\`\`${item.codeblock.language}`,
      item.codeblock.code.replace(/\n$/, ''),
      '```',
      '',
    ].join('\n');
  }

  protected synthesizeContent(): Array<string> {
    const content = [heading(this.headingLevel, this.title)];

    let headingLevel = this.headingLevel + 1;
    for (const [group, examples] of this.items) {
      content.push('');
      if (group !== 'ungrouped') {
        content.push(heading(headingLevel as HeadingLevel, group), '');
        headingLevel++;
      }
      content.push(
        ...examples.map((item) =>
          this.itemMapper(item, headingLevel as HeadingLevel),
        ),
      );
    }

    return content;
  }
}

export function examplesSection(options?: ExamplesOptions) {
  return new Examples(options);
}
