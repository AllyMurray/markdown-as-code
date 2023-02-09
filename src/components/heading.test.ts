import { heading, HeadingLevel } from './heading';

describe('heading', () => {

  const headingLevels: Array<HeadingLevel> = [1, 2, 3, 4, 5, 6];
  it.each(headingLevels)('should return the correct result for heading %i', (level) => {
    expect(heading(level, `Test ${level}`)).toBe(`${'#'.repeat(level)} Test ${level}`);
  });

  // it('should return the correct result for heading 1', () => {
  //   expect(heading(1, 'Test 1')).toBe('# Test 1');
  // });
});