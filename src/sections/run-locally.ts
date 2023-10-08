import { type ListOptions, ListSection } from './list-section.js';

interface RunLocalStep {
  description: string;
  command: string;
}

export interface RunLocalOptions extends Partial<ListOptions> {}

export class RunLocally extends ListSection<RunLocalStep> {
  constructor(options?: RunLocalOptions) {
    super({
      title: options?.title ?? 'Run Locally',
      type: 'Unordered',
      ...options,
    });
  }

  protected itemMapper(step: RunLocalStep): string {
    return [step.description, '', '```bash', step.command, '```'].join('\n');
  }
}

export function runLocallySection(options?: RunLocalOptions) {
  return new RunLocally(options);
}
