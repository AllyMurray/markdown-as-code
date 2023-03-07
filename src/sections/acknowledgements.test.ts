import { Acknowledgements } from './acknowledgements.js';

describe('Acknowledgements', () => {
  it('should return title only when no items are added', () => {
    const section = new Acknowledgements();
    expect(section.synthesize()).toBe('## Acknowledgements\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = new Acknowledgements().add({
      text: 'Acknowledgement',
      url: 'https://github.com',
    });
    expect(section.synthesize()).toBe(
      ['## Acknowledgements', '* [Acknowledgement](https://github.com)'].join(
        '\n\n'
      )
    );
  });

  it('should return correct syntax when multiple items is added', () => {
    const section = new Acknowledgements()
      .add({
        text: 'Acknowledgement 1',
        url: 'https://github.com',
      })
      .add({
        text: 'Acknowledgement 2',
        url: 'https://github.com',
      });
    expect(section.synthesize()).toBe(
      [
        '## Acknowledgements',
        '* [Acknowledgement 1](https://github.com)',
        '* [Acknowledgement 2](https://github.com)',
      ].join('\n\n')
    );
  });
});
