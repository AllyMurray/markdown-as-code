const emphasisOptions = [
  'Bold',
  'Italic',
  'Strikethrough',
  'BoldItalic',
  'Subscript',
  'Superscript',
] as const;
export type Emphasis = (typeof emphasisOptions)[number];

const emphasisBold = '**';
const emphasisItalic = '*';
const emphasisStrikethrough = '~~';
const emphasisBoldItalic = '***';

const syntaxLookup = new Map<Emphasis, { open: string; close: string }>([
  ['Bold', { open: emphasisBold, close: emphasisBold }],
  ['Italic', { open: emphasisItalic, close: emphasisItalic }],
  [
    'Strikethrough',
    { open: emphasisStrikethrough, close: emphasisStrikethrough },
  ],
  ['BoldItalic', { open: emphasisBoldItalic, close: emphasisBoldItalic }],
  ['Subscript', { open: '<sub>', close: '</sub>' }],
  ['Superscript', { open: '<sup>', close: '</sup>' }],
]);

export const style = (emphasis: Emphasis, text: String) => {
  const syntax = syntaxLookup.get(emphasis);

  if (!syntax) {
    throw new Error(`Invalid emphasis: ${emphasis}`);
  }

  return `${syntax.open}${text}${syntax.close}`;
};
