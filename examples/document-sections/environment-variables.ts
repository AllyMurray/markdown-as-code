import { environmentVariablesSection } from 'markdown-as-code';

const content = environmentVariablesSection()
  .add({
    name: 'API_KEY',
    defaultValue: 'YOUR-API-KEY-HERE',
  })
  .synthesize();
