import { FAQ } from './faq.js';

describe('FAQ', () => {
  it('should return title only when no items are added', () => {
    const section = new FAQ();
    expect(section.synthesize()).toBe('## FAQ\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = new FAQ().add({
      question: 'Question 1',
      answer: 'Answer 1',
    });
    expect(section.synthesize()).toBe(
      ['## FAQ', '', '#### Question 1', '', 'Answer 1'].join('\n')
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = new FAQ()
      .add({
        question: 'Question 1',
        answer: 'Answer 1',
      })
      .add({
        question: 'Question 2',
        answer: 'Answer 2',
      });
    expect(section.synthesize()).toBe(
      [
        '## FAQ',
        '',
        '#### Question 1',
        '',
        'Answer 1',
        '',
        '#### Question 2',
        '',
        'Answer 2',
      ].join('\n')
    );
  });
});
