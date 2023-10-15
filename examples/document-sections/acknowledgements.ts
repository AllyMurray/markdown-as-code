import { acknowledgementsSection } from 'markdown-as-code';

const content = acknowledgementsSection()
  .add({
    text: 'Acknowledgement',
    url: 'https://github.com',
  })
  .synthesize();
