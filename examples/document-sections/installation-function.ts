import { installationSection } from 'markdown-as-code';

const content = installationSection()
  .add({
    command: 'npm i markdown-as-code',
    description: 'Install using npm',
  })
  .synthesize();
