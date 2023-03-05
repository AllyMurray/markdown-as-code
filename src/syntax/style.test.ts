import { Emphasis, style } from './style.js';

describe('style', () => {
  const testcases: Array<{ emphasis: Emphasis; expected: string }> = [
    { emphasis: 'Bold', expected: '**Test**' },
    { emphasis: 'Italic', expected: '*Test*' },
    { emphasis: 'Strikethrough', expected: '~~Test~~' },
    { emphasis: 'BoldItalic', expected: '***Test***' },
    { emphasis: 'Subscript', expected: '<sub>Test</sub>' },
    { emphasis: 'Superscript', expected: '<sup>Test</sup>' },
  ];

  it.each(testcases)(
    'should return $emphasis text',
    ({ emphasis, expected }) => {
      expect(style(emphasis, 'Test')).toBe(expected);
    }
  );

  it('should throw when an invalid emphasis is provided', () => {
    expect(() => style('Unknown' as Emphasis, 'Test')).toThrowError(
      'Invalid emphasis: Unknown'
    );
  });
});
