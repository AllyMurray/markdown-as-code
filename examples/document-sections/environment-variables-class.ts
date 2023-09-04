import { EnvironmentVariables } from 'markdown-as-code';

const content = new EnvironmentVariables()
  .add({
    name: 'API_KEY',
    defaultValue: 'YOUR-API-KEY-HERE',
  })
  .synthesize();
