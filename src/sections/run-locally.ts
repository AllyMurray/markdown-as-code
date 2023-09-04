import { ListSection } from './list-section.js';

interface RunLocalStep {
  description: string;
  command: string;
}

export class RunLocally extends ListSection<RunLocalStep> {
  constructor(title?: string) {
    super(title ?? 'Run Locally', 'Unordered');
  }

  protected itemMapper(step: RunLocalStep): string {
    return [step.description, '', '```bash', step.command, '```'].join('\n');
  }
}

export function runLocallySection(title?: string) {
  return new RunLocally(title);
}
