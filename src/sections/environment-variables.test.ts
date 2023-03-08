import { EnvironmentVariables } from './environment-variables.js';

describe('EnvironmentVariables', () => {
  it('should return title only when no items are added', () => {
    const section = new EnvironmentVariables();
    expect(section.synthesize()).toBe(
      [
        '## Environment Variables',
        '',
        'To run this project, you will need to add the following environment variables to your .env file',
      ].join('\n')
    );
  });

  it('should return correct syntax when one item is added', () => {
    const section = new EnvironmentVariables().add({
      name: 'API_KEY',
      defaultValue: 'YOUR-API-KEY-HERE',
    });
    expect(section.synthesize()).toBe(
      [
        '## Environment Variables',
        '',
        'To run this project, you will need to add the following environment variables to your .env file',
        '',
        '```bash',
        'API_KEY=YOUR-API-KEY-HERE',
        '```',
      ].join('\n')
    );
  });

  it('should return correct syntax when multiple items is added', () => {
    const section = new EnvironmentVariables()
      .add({
        name: 'LOG_LEVEL',
        defaultValue: 'INFO',
      })
      .add({
        name: 'API_KEY',
        defaultValue: 'YOUR-API-KEY-HERE',
      });
    expect(section.synthesize()).toBe(
      [
        '## Environment Variables',
        '',
        'To run this project, you will need to add the following environment variables to your .env file',
        '',
        '```bash',
        'LOG_LEVEL=INFO',
        'API_KEY=YOUR-API-KEY-HERE',
        '```',
      ].join('\n')
    );
  });

  it('should return the correct syntax when no default value is supplied', () => {
    const section = new EnvironmentVariables().add({
      name: 'API_KEY',
    });
    expect(section.synthesize()).toBe(
      [
        '## Environment Variables',
        '',
        'To run this project, you will need to add the following environment variables to your .env file',
        '',
        '```bash',
        'API_KEY=',
        '```',
      ].join('\n')
    );
  });
});
