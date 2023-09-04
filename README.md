# markdown-as-code

This project allows managing Markdown files through JavaScript/TypeScript

## Table of Contents

- [Installation](#installation)
- [Run Locally](#run-locally)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)
- [Examples](#examples)

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

## Authors

- [@AllyMurray](https://www.github.com/AllyMurray)

## Acknowledgements

- [Readme.so](https://readme.so)

## Examples

### Document Sections

#### Acknowledgements Class

```typescript
import { Acknowledgements } from 'markdown-as-code';

const content = new Acknowledgements()
  .add({
    text: 'Acknowledgement',
    url: 'https://github.com',
  })
  .synthesize();
```

#### Acknowledgements Function

```typescript
import { acknowledgementsSection } from 'markdown-as-code';

const content = acknowledgementsSection()
  .add({
    text: 'Acknowledgement',
    url: 'https://github.com',
  })
  .synthesize();
```

#### Api Reference Class

```typescript
import { ApiReference } from 'markdown-as-code';

const content = new ApiReference()
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

#### Api Reference Function

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

#### Appendix Class

```typescript
import { Appendix } from 'markdown-as-code';

const content = new Appendix().appendContent('Test content').synthesize();
```

#### Appendix Function

```typescript
import { appendixSection } from 'markdown-as-code';

const content = appendixSection().appendContent('Test content').synthesize();
```

#### Authors Class

```typescript
import { Authors } from 'markdown-as-code';

const content = new Authors()
  .add({ githubUsername: 'JaneDoe' })
  .add({ githubUsername: 'JohnSmith' })
  .synthesize();
```

#### Authors Function

```typescript
import { authorsSection } from 'markdown-as-code';

const content = authorsSection()
  .add({ githubUsername: 'JaneDoe' })
  .add({ githubUsername: 'JohnSmith' })
  .synthesize();
```

#### Content Class

```typescript
import { ContentSection } from 'markdown-as-code';

const content = new ContentSection('Test Section').synthesize();
```

#### Content Function

```typescript
import { contentSection } from 'markdown-as-code';

const content = contentSection('Test Section').synthesize();
```

#### Contributing Class

```typescript
import { Contributing } from 'markdown-as-code';

const content = new Contributing().synthesize();
```

#### Contributing Function

```typescript
import { contributingSection } from 'markdown-as-code';

const content = contributingSection().synthesize();
```

#### Environment Variables Class

```typescript
import { EnvironmentVariables } from 'markdown-as-code';

const content = new EnvironmentVariables()
  .add({
    name: 'API_KEY',
    defaultValue: 'YOUR-API-KEY-HERE',
  })
  .synthesize();
```

#### Environment Variables Function

```typescript
import { environmentVariablesSection } from 'markdown-as-code';

const content = environmentVariablesSection()
  .add({
    name: 'API_KEY',
    defaultValue: 'YOUR-API-KEY-HERE',
  })
  .synthesize();
```

#### Examples Class

```typescript
import { Examples } from 'markdown-as-code';

const content = new Examples()
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

#### Examples Function

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

#### Faq Class

```typescript
import { FAQ } from 'markdown-as-code';

const content = new FAQ()
  .add({
    question: 'Question 1',
    answer: 'Answer 1',
  })
  .synthesize();
```

#### Faq Function

```typescript
import { faqSection } from 'markdown-as-code';

const content = faqSection()
  .add({
    question: 'Question 1',
    answer: 'Answer 1',
  })
  .synthesize();
```

#### Installation Class

```typescript
import { Installation } from 'markdown-as-code';

const content = new Installation()
  .add({
    command: 'npm i markdown-as-code',
    description: 'Install using npm',
  })
  .synthesize();
```

#### Installation Function

```typescript
import { installationSection } from 'markdown-as-code';

const content = installationSection()
  .add({
    command: 'npm i markdown-as-code',
    description: 'Install using npm',
  })
  .synthesize();
```

#### Roadmap Class

```typescript
import { Roadmap } from 'markdown-as-code';

const content = new Roadmap().add({ text: 'Item 1' }).synthesize();
```

#### Roadmap Function

```typescript
import { roadmapSection } from 'markdown-as-code';

const content = roadmapSection().add({ text: 'Item 1' }).synthesize();
```

#### Run Locally Class

```typescript
import { RunLocally } from 'markdown-as-code';

const content = new RunLocally()
  .add({
    command: 'npm t',
    description: 'Run the tests',
  })
  .synthesize();
```

#### Run Locally Function

```typescript
import { runLocallySection } from 'markdown-as-code';

const content = runLocallySection()
  .add({
    command: 'npm t',
    description: 'Run the tests',
  })
  .synthesize();
```

#### Support Class

```typescript
import { Support } from 'markdown-as-code';

const support = new Support().appendContent('Test content').synthesize();
```

#### Support Function

```typescript
import { supportSection } from 'markdown-as-code';

const support = supportSection().appendContent('Test content').synthesize();
```

#### Table Of Contents Class

```typescript
import { TableOfContentsSection, ContentSection } from 'markdown-as-code';

const content = new TableOfContentsSection({
  sections: [new ContentSection('Test Section')],
}).synthesize();
```

#### Table Of Contents Function

```typescript
import { tableOfContentsSection, contentSection } from 'markdown-as-code';

const content = tableOfContentsSection({
  sections: [contentSection('Test Section')],
}).synthesize();
```


### Documents

#### Markdown

```typescript
import { createMarkdownDocument, ContentSection } from 'markdown-as-code';

const content = createMarkdownDocument({
  title: 'Test',
  fileName: 'test.md',
})
  .addSection(new ContentSection('Custom Section', 'Some markdown content'))
  .synthContent();
```

#### Readme

```typescript
import { createReadmeDocument, ContentSection } from 'markdown-as-code';

const content = createReadmeDocument({
  title: 'Test',
  fileName: 'test.md',
})
  .addSection(new ContentSection('Custom Section', 'Some markdown content'))
  .synthContent();
```


### Syntax Functions

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
