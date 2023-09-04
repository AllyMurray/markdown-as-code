import { RunLocally } from 'markdown-as-code';

const content = new RunLocally()
  .add({
    command: 'npm t',
    description: 'Run the tests',
  })
  .synthesize();
