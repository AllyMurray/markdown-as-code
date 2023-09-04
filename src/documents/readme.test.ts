import fs from 'fs';
import { createReadmeDocument } from './readme.js';

jest.mock('fs');
const mockedFs = jest.mocked(fs);

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
      .acknowledgements((section) => {
        section.add({ text: 'GitHub', url: 'https://github.com' });
      })
      .apiReference((section) => {
        section.add({
          title: 'Get all items',
          httpMethod: 'GET',
          path: '/api/items',
          parameter: {
            name: 'api_key',
            type: 'string',
            description: '**Required**. Your API key',
          },
        });
      })
      .authors((section) => {
        section.add({ githubUsername: 'AllyMurray' });
      })
      .contributing((section) => {
        section.appendContent('Some additional markdown content');
      })
      .environmentVariables((section) => {
        section.add({
          name: 'API_KEY',
          defaultValue: 'YOUR-API-KEY-HERE',
        });
      })
      .examples((section) => {
        section
          .add({
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
          })
          .add({
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
          });
      })
      .faq((section) => {
        section.add({
          question: 'Question 1',
          answer: 'Answer 1',
        });
      })
      .installation((step) => {
        step.add({
          description: 'Install using npm',
          command: 'npm i readme-as-code',
        });
      })
      .runLocally((step) => {
        step.add({
          description: 'Run the tests',
          command: 'npm t',
        });
      })
      .roadmap((section) => {
        section.add({ text: 'Item 1' });
      })
      .support((section) => {
        section.appendContent('Test content');
      })
      .appendix((section) => {
        section.appendContent('Some content');
      });

    expect(readme.synthContent()).toMatchSnapshot();
  });

  it('should write a document to disk', () => {
    const markdownDoc = createReadmeDocument({
      title: 'Test',
      fileName: 'test.md',
    });

    markdownDoc.synth();

    expect(mockedFs.writeFileSync.mock.calls[0][0]).toContain(
      'markdown-as-code/test.md'
    );
    expect(mockedFs.writeFileSync.mock.calls[0][1]).toMatchSnapshot();
  });
});
