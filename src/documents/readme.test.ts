import fs from 'fs';
import { createReadmeDocument } from './readme.js';
import {
  acknowledgementsSection,
  apiReferenceSection,
  appendixSection,
  authorsSection,
  contentSection,
  contributingSection,
  environmentVariablesSection,
  examplesSection,
  faqSection,
  installationSection,
  roadmapSection,
  runLocallySection,
  supportSection,
} from '../index.js';

vi.mock('fs');
const mockedFs = vi.mocked(fs);

describe('Readme', () => {
  it('should default to README.md', () => {
    const readme = createReadmeDocument({
      fileName: 'Readme.md',
    });

    expect(readme.synthContent()).toContain('# README.md');
  });

  it('should match snapshot', () => {
    const readme = createReadmeDocument({
      title: 'Readme as Code',
      fileName: 'Readme.md',
    })
      .addAcknowledgements(
        acknowledgementsSection({
          items: [{ text: 'GitHub', url: 'https://github.com' }],
        }),
      )
      .addApiReference(
        apiReferenceSection({
          items: [
            {
              title: 'Get all items',
              httpMethod: 'GET',
              path: '/api/items',
              parameter: {
                name: 'api_key',
                type: 'string',
                description: '**Required**. Your API key',
              },
            },
          ],
        }),
      )
      .addAuthors(authorsSection({ items: [{ githubUsername: 'AllyMurray' }] }))
      .addContributing(
        contributingSection().appendContent('Some additional markdown content'),
      )
      .addEnvironmentVariables(
        environmentVariablesSection({
          items: [{ name: 'API_KEY', defaultValue: 'YOUR-API-KEY-HERE' }],
        }),
      )
      .addExamples(
        examplesSection({
          items: [
            {
              title: 'Initialize the library',
              description:
                'When creating the Readme instance the project name and description must be supplied',
              codeblock: {
                language: 'typescript',
                code: [
                  'const readme = new Readme({',
                  `  name: 'Example Project',`,
                  `  description: 'Define and maintain your README.md through code.',`,
                  '});',
                ].join('\n'),
              },
            },
            {
              title: 'Add installation instructions',
              codeblock: {
                language: 'typescript',
                code: [
                  'const readme = new Readme({',
                  `  name: 'Example Project',`,
                  `  description: 'Define and maintain your README.md through code.',`,
                  '});',
                  '',
                  'readme.installation((step) => {',
                  '  step.add({',
                  `    description: 'Install using npm',`,
                  `    command: 'npm i readme-as-code',`,
                  '  });',
                  '})',
                ].join('\n'),
              },
            },
          ],
        }),
      )
      .addFaq(
        faqSection({ items: [{ question: 'Question 1', answer: 'Answer 1' }] }),
      )
      .addInstallation(
        installationSection({
          items: [
            {
              description: 'Install using npm',
              command: 'npm i readme-as-code',
            },
          ],
        }),
      )
      .addRunLocally(
        runLocallySection({
          items: [{ description: 'Run the tests', command: 'npm t' }],
        }),
      )
      .addRoadmap(roadmapSection({ items: [{ text: 'Item 1' }] }))
      .addSupport(supportSection().appendContent('Test content'))
      .addAppendix(appendixSection().appendContent('Some content'));

    expect(readme.synthContent()).toMatchSnapshot();
  });

  it('should write a document to disk', () => {
    const markdownDoc = createReadmeDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.synth();

    expect(mockedFs.writeFileSync.mock.calls[0][0]).toContain(
      'markdown-as-code/test.md',
    );
    expect(mockedFs.writeFileSync.mock.calls[0][1]).toMatchSnapshot();
  });

  it('should throw an error if the section sort order is not defined', () => {
    const readme = createReadmeDocument({
      title: 'Readme as Code',
      fileName: 'Readme.md',
    });

    const sectionWithoutSortOrder = contentSection({ title: 'test' });

    expect(() => {
      readme['getSortOrder'](sectionWithoutSortOrder);
    }).toThrowError('Unknown section type');
  });
});
