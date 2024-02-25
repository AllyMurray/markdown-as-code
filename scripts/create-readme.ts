import { readFileSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { capitalCase, trainCase } from 'change-case';
import { createMarkdownDocument } from '../src/documents/markdown.js';
import { acknowledgementsSection } from '../src/sections/acknowledgements.js';
import { authorsSection } from '../src/sections/authors.js';
import { examplesSection, type Example } from '../src/sections/examples.js';
import { installationSection } from '../src/sections/installation.js';
import { runLocallySection } from '../src/sections/run-locally.js';

type ReadmeOptions = {
  ourDir: string;
};

async function getExamples() {
  const examplesDirectoryPath = path.resolve('examples');
  const examplesSubDirectoryPaths = await readdir(examplesDirectoryPath);

  const codeExamples: Array<{
    group: string;
    examples: Array<{ title: string; content: string }>;
  }> = [];
  for (const examplesSubDirectoryPath of examplesSubDirectoryPaths.filter(
    (p) => p !== 'node_modules',
  )) {
    const absoluteExamplesSubDirectoryPath = path.join(
      examplesDirectoryPath,
      examplesSubDirectoryPath,
    );

    if (!(await stat(absoluteExamplesSubDirectoryPath)).isDirectory()) {
      continue;
    }

    const exampleFilePaths = await readdir(absoluteExamplesSubDirectoryPath);
    const examples = await Promise.all(
      exampleFilePaths.map(async (file: string) => {
        const content = await readFile(
          path.join(absoluteExamplesSubDirectoryPath, file),
          'utf8',
        );

        return { title: capitalCase(path.parse(file).name), content };
      }),
    );

    codeExamples.push({ group: examplesSubDirectoryPath, examples });
  }

  return codeExamples;
}

export async function createReadme(options: ReadmeOptions) {
  const packageJson = JSON.parse(
    readFileSync('./package.json', { encoding: 'utf-8' }),
  );

  const installation = installationSection({
    items: [
      {
        description: 'Install using npm',
        command: 'npm i markdown-as-code',
      },
      {
        description: 'Install using pnpm',
        command: 'pnpm i markdown-as-code',
      },
      {
        description: 'Install using yarn',
        command: 'yarn add markdown-as-code',
      },
      {
        description: 'Run tests',
        command: ['npm t', '# or', 'npm run test'],
      },
    ],
  });

  const runLocally = runLocallySection({
    items: [
      {
        description: 'Run the tests',
        command: 'pnpm t',
      },
    ],
  });

  const authors = authorsSection({
    items: [
      { githubUsername: 'AllyMurray' },
      { githubUsername: 'Andrchiamus' },
    ],
  });

  const acknowledgements = acknowledgementsSection({
    items: [{ text: 'Readme.so', url: 'https://readme.so' }],
  });

  const exampleItems: Array<Example> = [];
  const groupedCodeExamples = await getExamples();
  for (const groupedCodeExample of groupedCodeExamples) {
    for (const codeExample of groupedCodeExample.examples) {
      exampleItems.push({
        title: codeExample.title,
        codeblock: { code: codeExample.content, language: 'typescript' },
        group: trainCase(groupedCodeExample.group).replace(/-/g, ' '),
      });
    }
  }

  const examples = examplesSection({ items: exampleItems });

  createMarkdownDocument({
    title: packageJson.name,
    fileName: 'README.md',
    description:
      'This project allows managing Markdown files through JavaScript/TypeScript',
    outDir: options.ourDir,
    content: [installation, runLocally, examples, authors, acknowledgements],
  }).synth();
}
