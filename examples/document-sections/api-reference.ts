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
