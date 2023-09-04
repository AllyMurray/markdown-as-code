import { roadmapSection } from './roadmap.js';

describe('Roadmap', () => {
  it('should return title only when no items are added', () => {
    const section = roadmapSection();
    expect(section.synthesize()).toBe('## Roadmap\n\n');
  });

  it('should return correct syntax when one item is added', () => {
    const section = roadmapSection().add({ text: 'Item 1' });
    expect(section.synthesize()).toBe(
      ['## Roadmap', '', '- Item 1'].join('\n')
    );
  });

  it('should return correct syntax when multiple items are added', () => {
    const section = roadmapSection()
      .add({ text: 'Item 1' })
      .add({ text: 'Item 2' });
    expect(section.synthesize()).toBe(
      ['## Roadmap', '', '- Item 1', '', '- Item 2'].join('\n')
    );
  });
});
