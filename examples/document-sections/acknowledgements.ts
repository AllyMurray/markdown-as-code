import { Acknowledgements } from 'markdown-as-code';

const content = new Acknowledgements()
  .add({
    text: 'Acknowledgement',
    url: 'https://github.com',
  })
  .synthesize();
