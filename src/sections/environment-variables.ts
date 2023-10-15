import { type ListOptions, ListSection } from './list-section.js';
import { heading } from '../elements/heading.js';

interface EnvironmentVariable {
  name: string;
  defaultValue?: string;
}

export interface EnvironmentVariablesOptions extends Partial<ListOptions> {}

export class EnvironmentVariables extends ListSection<EnvironmentVariable> {
  constructor(options?: EnvironmentVariablesOptions) {
    super({
      title: options?.title ?? 'Environment Variables',
      type: 'None',
      ...options,
    });
  }

  protected itemMapper(item: EnvironmentVariable): string {
    return `${item.name}=${item.defaultValue ?? ''}`;
  }

  protected synthesizeContent(): string[] {
    return [
      heading(this.headingLevel, this.title),
      '',
      `To run this project, you will need to add the following environment variables to your .env file`,
      ...(this.items.length
        ? ['', '```bash', this.items.map(this.itemMapper).join('\n'), '```']
        : []),
    ];
  }
}

export function environmentVariablesSection(
  options?: EnvironmentVariablesOptions,
) {
  return new EnvironmentVariables(options);
}
