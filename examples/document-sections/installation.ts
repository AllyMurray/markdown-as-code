import { Installation } from 'markdown-as-code';

const content = new Installation()
  .add({
    command: 'npm i markdown-as-code',
    description: 'Install using npm',
  })
  .synthesize();
