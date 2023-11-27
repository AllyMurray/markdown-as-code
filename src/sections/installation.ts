import { type ListOptions, ListSection } from './list-section.js';

interface InstallationStep {
  description: string;
  command: string | Array<string>;
}

export interface InstallationOptions
  extends Partial<ListOptions<InstallationStep>> {}

export class Installation extends ListSection<InstallationStep> {
  constructor(options?: InstallationOptions) {
    super({
      title: options?.title ?? 'Installation',
      type: 'None',
      ...options,
    });
  }

  protected itemMapper(step: InstallationStep): string {
    const command = Array.isArray(step.command)
      ? step.command.join('\n')
      : step.command;

    return [step.description, '', '```bash', command, '```'].join('\n');
  }
}

export function installationSection(options?: InstallationOptions) {
  return new Installation(options);
}
