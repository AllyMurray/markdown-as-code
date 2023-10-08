import { contentSection } from './content-section.js';
import { faqSection } from './faq.js';

describe('FAQ', () => {
  it('should return title only when no items are added', () => {
    const section = faqSection();
    expect(section.synthesize()).toBe('## FAQ\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = faqSection().add({
      question: 'Question 1',
      answer: 'Answer 1',
    });
    expect(section.synthesize()).toBe(
      ['## FAQ', '', '#### Question 1', '', 'Answer 1'].join('\n')
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = faqSection()
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

  it('should not set heading level greater than 6', () => {
    const testFaqSection = faqSection().add({
      question: 'Question 1',
      answer: 'Answer 1',
    });

    contentSection({ title: 'Level 1' }).addSubSection(
      contentSection({ title: 'Level 2' }).addSubSection(
        contentSection({ title: 'Level 3' }).addSubSection(
          contentSection({ title: 'Level 4' }).addSubSection(
            contentSection({ title: 'Level 5' }).addSubSection(testFaqSection)
          )
        )
      )
    );

    expect(testFaqSection.synthesize()).toMatchInlineSnapshot(`
      "###### FAQ

      ###### Question 1

      Answer 1"
    `);
  });

  it('should allow for custom titles', () => {
    const section = faqSection({ title: 'Custom Title' });
    expect(section.synthesize()).toBe('## Custom Title\n\n');
  });
});
