import { runLocallySection } from 'markdown-as-code';

const content = runLocallySection()
  .add({
    command: 'npm t',
    description: 'Run the tests',
  })
  .synthesize();
