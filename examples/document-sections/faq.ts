import { FAQ } from 'markdown-as-code';

const content = new FAQ()
  .add({
    question: 'Question 1',
    answer: 'Answer 1',
  })
  .synthesize();
