import { faqSection } from 'markdown-as-code';

const content = faqSection()
  .add({
    question: 'Question 1',
    answer: 'Answer 1',
  })
  .synthesize();
