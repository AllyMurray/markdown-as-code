import { ListSection } from './list-section.js';

interface InstallationStep {
  description: string;
  command: string | Array<string>;
}

export class Installation extends ListSection<InstallationStep> {
  constructor(title?: string) {
    super(title ?? 'Installation', 'None');
  }

  protected itemMapper(step: InstallationStep): string {
    const command = Array.isArray(step.command)
      ? step.command.join('\n')
      : step.command;

    return [step.description, '', '```bash', command, '```'].join('\n');
  }
}
