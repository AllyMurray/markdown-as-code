# markdown-as-code

This project allows managing Markdown files through JavaScript/TypeScript

## Table of Contents

- [Roadmap](#roadmap)
- [Installation](#installation)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)
- [Examples](#examples)

## Roadmap

* Documentation 😅

## Installation

Install using npm

```bash
npm install markdown-as-code
```

Install using yarn

```bash
yarn add markdown-as-code
```

Run tests

```bash
npm t
# or
npm run test
```

## Authors

* [@AllyMurray](https://www.github.com/AllyMurray)

## Acknowledgements

* [Readme.so](https://readme.so)

## Examples

#### Code Block

```typescript
import { codeBlock } from 'markdown-as-code';

codeBlock({ language: 'typescript', code: 'const testNumber = 1' });

```

#### Heading

```typescript
import { heading } from 'markdown-as-code';

heading(1, 'Heading Level 1');
heading(2, 'Heading Level 2');
heading(3, 'Heading Level 3');
heading(4, 'Heading Level 4');
heading(5, 'Heading Level 5');
heading(6, 'Heading Level 6');

```

#### Image

```typescript
import { image } from 'markdown-as-code';

image('https://via.placeholder.com/150', 'Placeholder Image');

```

#### Link

```typescript
import { link } from 'markdown-as-code';

link('Link Text', '');

```

#### List

```typescript
import { orderedList, unorderedList, taskList } from 'markdown-as-code';

orderedList(['Item 1', 'Item 2', 'Item 3']);

unorderedList(['Item 1', 'Item 2', 'Item 3']);

taskList([
  { description: 'Task 1', complete: true },
  { description: 'Task 2', complete: false },
  { description: 'Task 3', complete: true },
]);

```

#### Mention

```typescript
import { mentionPerson } from 'markdown-as-code';

mentionPerson('AllyMurray');

```

#### Quote

```typescript
import { quote } from 'markdown-as-code';

quote('This is a quote');

```

#### Style

```typescript
import { style } from 'markdown-as-code';

style('Bold', 'Example Bold Text');
style('Italic', 'Example Italic Text');
style('Strikethrough', 'Example Strikethrough Text');
style('Superscript', 'Example Superscript Text');
style('Subscript', 'Example Subscript Text');
style('BoldItalic', 'Example BoldItalic Text');

```