import { installationSection } from './installation.js';

describe('Installation', () => {
  it('should return title only when no items are added', () => {
    const section = installationSection();
    expect(section.synthesize()).toBe('## Installation\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = installationSection().add({
      command: 'npm i markdown-as-code',
      description: 'Install using npm',
    });
    expect(section.synthesize()).toBe(
      [
        '## Installation',
        '',
        'Install using npm',
        '',
        '```bash',
        'npm i markdown-as-code',
        '```',
      ].join('\n'),
    );
  });

  it('should return correct syntax when an item is added with multiple commands', () => {
    const section = installationSection().add({
      command: [
        '# Install latest',
        'npm i markdown-as-code',
        '# Install a specific version',
        'npm i markdown-as-code@1.0.0',
      ],
      description: 'Install using npm',
    });
    expect(section.synthesize()).toBe(
      [
        '## Installation',
        '',
        'Install using npm',
        '',
        '```bash',
        '# Install latest',
        'npm i markdown-as-code',
        '# Install a specific version',
        'npm i markdown-as-code@1.0.0',
        '```',
      ].join('\n'),
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = installationSection()
      .add({
        command: 'npm i markdown-as-code',
        description: 'Install using npm',
      })
      .add({
        command: 'yarn add markdown-as-code',
        description: 'Install using yarn',
      });
    expect(section.synthesize()).toBe(
      [
        '## Installation',
        '',
        'Install using npm',
        '',
        '```bash',
        'npm i markdown-as-code',
        '```',
        '',
        'Install using yarn',
        '',
        '```bash',
        'yarn add markdown-as-code',
        '```',
      ].join('\n'),
    );
  });

  it('should allow custom title', () => {
    const section = installationSection({ title: 'Install' }).add({
      command: 'npm i markdown-as-code',
      description: 'Install using npm',
    });
    expect(section.synthesize()).toBe(
      [
        '## Install',
        '',
        'Install using npm',
        '',
        '```bash',
        'npm i markdown-as-code',
        '```',
      ].join('\n'),
    );
  });
});
