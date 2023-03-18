import { ApiEndpoint, ApiReference } from './api-reference.js';

describe('API Reference', () => {
  it('should return the correct markdown syntax using the default title', () => {
    expect(new ApiReference().synthesize()).toBe('## API Reference');
  });

  it('should return the correct markdown syntax using a custom title', () => {
    expect(
      new ApiReference('Markdown as Code API Reference').synthesize()
    ).toBe('## Markdown as Code API Reference');
  });

  it('should return the correct markdown after adding an API Endpoint', () => {
    const apiReference = new ApiReference();

    apiReference.add({
      title: 'Get all items',
      httpMethod: 'GET',
      path: '/api/items',
      parameter: {
        name: 'api_key',
        type: 'string',
        description: '**Required**. Your API key',
      },
    });

    expect(apiReference.synthesize()).toBe(
      [
        '## API Reference',
        '',
        '#### Get all items',
        '',
        '```http',
        'GET /api/items',
        '```',
        '',
        '| Parameter | Type     | Description                |',
        '| :-------- | :------- | :------------------------- |',
        '|api_key | string | **Required**. Your API key|',
      ].join('\n')
    );
  });

  it('should return the correct markdown after adding an API Function', () => {
    const apiReference = new ApiReference();

    apiReference.add({
      name: 'add',
      parameters: ['num1', 'num2'],
      description: 'Takes two numbers and returns the sum.',
    });

    expect(apiReference.synthesize()).toBe(
      [
        '## API Reference',
        '',
        '#### add(num1, num2)',
        '',
        'Takes two numbers and returns the sum.',
      ].join('\n')
    );
  });

  it('should throw when an unknown reference type is added', () => {
    expect(() => new ApiReference().add({} as ApiEndpoint)).toThrowError(
      'Unknown Reference Type'
    );
  });
});
