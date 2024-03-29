# markdown-as-code

This project allows managing Markdown files through JavaScript/TypeScript

## Table of Contents

- [Installation](#installation)
- [Run Locally](#run-locally)
- [Examples](#examples)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## Installation

Install using npm

```bash
npm i markdown-as-code
```

Install using pnpm

```bash
pnpm i markdown-as-code
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

## Run Locally

- Run the tests

```bash
pnpm t
```

## Examples

### Document Sections

#### Acknowledgements

```typescript
import { acknowledgementsSection } from 'markdown-as-code';

const content = acknowledgementsSection()
  .add({
    text: 'Acknowledgement',
    url: 'https://github.com',
  })
  .synthesize();
```

#### Api Reference

```typescript
import { apiReferenceSection } from 'markdown-as-code';

const content = apiReferenceSection()
  .add({
    title: 'Get all items',
    httpMethod: 'GET',
    path: '/api/items',
    parameter: {
      name: 'api_key',
      type: 'string',
      description: '**Required**. Your API key',
    },
  })
  .synthesize();
```

#### Appendix

```typescript
import { appendixSection } from 'markdown-as-code';

const content = appendixSection().appendContent('Test content').synthesize();
```

#### Authors

```typescript
import { authorsSection } from 'markdown-as-code';

const content = authorsSection()
  .add({ githubUsername: 'JaneDoe' })
  .add({ githubUsername: 'JohnSmith' })
  .synthesize();
```

#### Content

```typescript
import { contentSection, orderedList } from 'markdown-as-code';

// Create a content section with a title
const section = contentSection('Test Section');

// Add content to the section using the appendContent method
section.appendContent('Some markdown content');

// Use one of the element builders to add content
section.appendContent(orderedList(['item 1', 'item 2']));
```

#### Contributing

```typescript
import { contributingSection } from 'markdown-as-code';

const content = contributingSection().synthesize();
```

#### Environment Variables

```typescript
import { environmentVariablesSection } from 'markdown-as-code';

const content = environmentVariablesSection()
  .add({
    name: 'API_KEY',
    defaultValue: 'YOUR-API-KEY-HERE',
  })
  .synthesize();
```

#### Examples

```typescript
import { examplesSection } from 'markdown-as-code';

const content = examplesSection()
  .add({
    title: 'Create an example section',
    description:
      'The title is defaulted to Examples but can be overridden in the constructor',
    codeblock: {
      language: 'typescript',
      code: 'const section = new Examples();',
    },
  })
  .synthesize();
```

#### Faq

```typescript
import { faqSection } from 'markdown-as-code';

const content = faqSection()
  .add({
    question: 'Question 1',
    answer: 'Answer 1',
  })
  .synthesize();
```

#### Installation

```typescript
import { installationSection } from 'markdown-as-code';

const content = installationSection()
  .add({
    command: 'npm i markdown-as-code',
    description: 'Install using npm',
  })
  .synthesize();
```

#### Roadmap

```typescript
import { roadmapSection } from 'markdown-as-code';

const content = roadmapSection().add({ text: 'Item 1' }).synthesize();
```

#### Run Locally

```typescript
import { runLocallySection } from 'markdown-as-code';

const content = runLocallySection()
  .add({
    command: 'npm t',
    description: 'Run the tests',
  })
  .synthesize();
```

#### Support

```typescript
import { supportSection } from 'markdown-as-code';

const support = supportSection().appendContent('Test content').synthesize();
```

#### Table Of Contents

```typescript
import { tableOfContentsSection, contentSection } from 'markdown-as-code';

const content = tableOfContentsSection({
  sections: [contentSection('Test Section')],
}).synthesize();
```


#### Documents

##### Markdown

```typescript
import { createMarkdownDocument, ContentSection } from 'markdown-as-code';

const content = createMarkdownDocument({
  title: 'Test',
  fileName: 'test.md',
})
  .addSection(new ContentSection('Custom Section', 'Some markdown content'))
  .synthContent();
```

##### Readme

```typescript
import { createReadmeDocument, ContentSection } from 'markdown-as-code';

const content = createReadmeDocument({
  title: 'Test',
  fileName: 'test.md',
})
  .addSection(new ContentSection('Custom Section', 'Some markdown content'))
  .synthContent();
```


##### Elements

###### Code Block

```typescript
import { codeBlock } from 'markdown-as-code';

codeBlock({ language: 'typescript', code: 'const testNumber = 1' });
```

###### Heading

```typescript
import { heading } from 'markdown-as-code';

heading(1, 'Heading Level 1');
heading(2, 'Heading Level 2');
heading(3, 'Heading Level 3');
heading(4, 'Heading Level 4');
heading(5, 'Heading Level 5');
heading(6, 'Heading Level 6');
```

###### Image

```typescript
import { image } from 'markdown-as-code';

image('https://via.placeholder.com/150', 'Placeholder Image');
```

###### Link

```typescript
import { link } from 'markdown-as-code';

link('Link Text', '');
```

###### List

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

###### Mention

```typescript
import { mentionPerson } from 'markdown-as-code';

mentionPerson('AllyMurray');
```

###### Quote

```typescript
import { quote } from 'markdown-as-code';

quote('This is a quote');
```

###### Style

```typescript
import { style } from 'markdown-as-code';

style('Bold', 'Example Bold Text');

style('Italic', 'Example Italic Text');

style('Strikethrough', 'Example Strikethrough Text');

style('Superscript', 'Example Superscript Text');

style('Subscript', 'Example Subscript Text');

style('BoldItalic', 'Example BoldItalic Text');
```

###### Table

```typescript
import { table } from 'markdown-as-code';

table<'email' | 'description'>({
  rows: [
    {
      email: 'hr@example.com',
      description: 'Human Resources email',
    },
    {
      email: 'support@example.com',
      description: 'Customer Support email',
    },
  ],
});
```


## Authors

- [@AllyMurray](https://www.github.com/AllyMurray)

- [@Andrchiamus](https://www.github.com/Andrchiamus)

## Acknowledgements

- [Readme.so](https://readme.so)