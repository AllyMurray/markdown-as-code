import { supportSection } from './support.js';

describe('support', () => {
  it('should return the correct syntax for the title and content', () => {
    expect(supportSection().appendContent('Test content').synthesize()).toBe(
      ['## Support', '', 'Test content'].join('\n')
    );
  });
});
