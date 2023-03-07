import { Appendix } from './appendix.js';

describe('appendix', () => {
  it('should return the correct syntax for the title and content', () => {
    expect(new Appendix().appendContent('Test content').synthesize()).toBe(
      ['## Appendix', '', 'Test content'].join('\n')
    );
  });
});
