import { readFileSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { capitalCase, trainCase } from 'change-case';
import { createReadmeDocument } from '../src/documents/readme.js';
import type { Example } from '../src/index.js';

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

  const readme = createReadmeDocument({
    title: packageJson.name,
    fileName: 'README.md',
    description:
      'This project allows managing Markdown files through JavaScript/TypeScript',
    outDir: options.ourDir,
  })
    .addInstallationSection({
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
    })
    .addRunLocallySection({
      items: [
        {
          description: 'Run the tests',
          command: 'pnpm t',
        },
      ],
    })
    .addAuthorsSection({
      items: [
        { githubUsername: 'AllyMurray' },
        { githubUsername: 'Andrchiamus' },
      ],
    })
    .addAcknowledgementsSection({
      items: [{ text: 'Readme.so', url: 'https://readme.so' }],
    });

  const examples: Array<Example> = [];
  const groupedCodeExamples = await getExamples();
  for (const groupedCodeExample of groupedCodeExamples) {
    for (const codeExample of groupedCodeExample.examples) {
      examples.push({
        title: codeExample.title,
        codeblock: { code: codeExample.content, language: 'typescript' },
        group: trainCase(groupedCodeExample.group).replace(/-/g, ' '),
      });
    }
  }

  readme.addExamplesSection({ items: examples });

  readme.synth();
}
