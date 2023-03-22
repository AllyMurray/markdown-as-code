import { readFileSync } from 'node:fs';
import { createReadmeDocument } from '../src/documents/readme.js';

type ReadmeOptions = {
  ourDir: string;
};

export function createReadme(options: ReadmeOptions) {
  const packageJson = JSON.parse(
    readFileSync('./package.json', { encoding: 'utf-8' })
  );

  createReadmeDocument({
    title: packageJson.name,
    fileName: 'README.md',
    description:
      'This project allows managing Markdown files through JavaScript/TypeScript',
    outDir: options.ourDir,
  })
    .roadmap((section) => {
      section.add({ text: 'Documentation 😅' });
    })
    .installation((step) => {
      step
        .add({
          description: 'Install using npm',
          command: 'npm install markdown-as-code',
        })
        .add({
          description: 'Install using yarn',
          command: 'yarn add markdown-as-code',
        })
        .add({
          description: 'Run tests',
          command: ['npm t', '# or', 'npm run test'],
        });
    })
    .authors((author) => {
      author.add({ githubUsername: 'AllyMurray' });
    })
    .acknowledgements((acknowledgement) => {
      acknowledgement.add({ text: 'Readme.so', url: 'https://readme.so' });
    })
    .synth();
}
