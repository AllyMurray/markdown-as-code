import { TypeScriptNpmPackage } from '@ally-murray/projen-modules';
import { createReadme } from './scripts/create-readme.js';

const project = new TypeScriptNpmPackage({
  name: 'markdown-as-code',
  description: 'Define and maintain markdown files through code.',
  authorName: 'Ally Murray',
  authorEmail: 'allymurray88@gmail.com',
  defaultReleaseBranch: 'main',
  repository: 'https://github.com/AllyMurray/markdown-as-code',
  deps: ['change-case'],
  devDeps: ['@ally-murray/projen-modules'],
  prerelease: 'beta',
});

project.synth();

await createReadme({ ourDir: project.outdir });
