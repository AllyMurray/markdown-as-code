import { TypeScriptNpmPackage } from '@ally-murray/projen-modules';

const project = new TypeScriptNpmPackage({
  name: 'markdown-as-code',
  description: 'Define and maintain markdown files through code.',
  authorName: 'Ally Murray',
  authorEmail: 'allymurray88@gmail.com',
  defaultReleaseBranch: 'main',
  deps: ['change-case'],
  devDeps: ['@ally-murray/projen-modules'],
});

project.synth();
