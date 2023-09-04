import { RunLocally } from './run-locally.js';

describe('Run Locally', () => {
  it('should return title only when no items are added', () => {
    const section = new RunLocally();
    expect(section.synthesize()).toBe('## Run Locally\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = new RunLocally().add({
      command: 'npm t',
      description: 'Run the tests',
    });
    expect(section.synthesize()).toBe(
      [
        '## Run Locally',
        '',
        '- Run the tests',
        '',
        '```bash',
        'npm t',
        '```',
      ].join('\n')
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = new RunLocally()
      .add({
        command: 'npm t',
        description: 'Run the tests',
      })
      .add({
        command: 'npm start',
        description: 'Start the app',
      });
    expect(section.synthesize()).toBe(
      [
        '## Run Locally',
        '',
        '- Run the tests',
        '',
        '```bash',
        'npm t',
        '```',
        '',
        '- Start the app',
        '',
        '```bash',
        'npm start',
        '```',
      ].join('\n')
    );
  });
});
