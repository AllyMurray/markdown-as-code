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
