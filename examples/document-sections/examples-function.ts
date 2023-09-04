import { examplesSection } from 'markdown-as-code';

const content = examplesSection()
  .add({
    title: 'Create an example section',
    description:
      'The title is defaulted to Examples but can be overridden in the constructor',
    codeblock: {
      language: 'typescript',
      code: 'const section = new Examples();',
    },
  })
  .synthesize();
