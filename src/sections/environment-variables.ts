import { ListSection } from './list-section.js';

interface EnvironmentVariable {
  name: string;
  defaultValue?: string;
}

export class EnvironmentVariables extends ListSection<EnvironmentVariable> {
  constructor(title?: string) {
    super(title ?? 'Environment Variables', 'None');
  }

  protected itemMapper(item: EnvironmentVariable): string {
    return `${item.name}=${item.defaultValue ?? ''}`;
  }

  protected synthesizeContent(): string[] {
    return [
      `## ${this.title}`,
      '',
      `To run this project, you will need to add the following environment variables to your .env file`,
      ...(this.items.length
        ? ['', '```bash', this.items.map(this.itemMapper).join('\n'), '```']
        : []),
    ];
  }
}
