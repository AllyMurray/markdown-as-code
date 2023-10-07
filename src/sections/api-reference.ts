import { DocumentSection } from './section.js';

interface Parameter {
  name: string;
  type: string;
  description: string;
}

export interface ApiEndpoint {
  title: string;
  httpMethod: string;
  path: string;
  parameter: Parameter;
}

export interface ApiFunction {
  name: string;
  parameters: Array<string>;
  description: string;
}

const isObject = (maybeObject: unknown): maybeObject is Object => {
  return (
    typeof maybeObject === 'object' &&
    !Array.isArray(maybeObject) &&
    maybeObject !== null
  );
};

const isApiEndpoint = (reference: unknown): reference is ApiEndpoint => {
  return (
    isObject(reference) &&
    ['title', 'httpMethod', 'path', 'parameter'].every(
      (property) => property in reference
    )
  );
};

const isApiFunction = (reference: unknown): reference is ApiFunction => {
  return (
    isObject(reference) &&
    ['name', 'parameters', 'description'].every(
      (property) => property in reference
    )
  );
};

export class ApiReference extends DocumentSection {
  private _apiEndpoints: Array<ApiEndpoint> = [];
  private _apiFunctions: Array<ApiFunction> = [];

  constructor(title?: string) {
    super({ title: title ?? 'API Reference' });
  }

  public add(reference: ApiEndpoint | ApiFunction) {
    if (isApiEndpoint(reference)) {
      this._apiEndpoints.push(reference);
    } else if (isApiFunction(reference)) {
      this._apiFunctions.push(reference);
    } else {
      throw new Error('Unknown Reference Type');
    }
    return this;
  }

  private mapEndpoint(apiEndpoint: ApiEndpoint): string {
    return [
      `#### ${apiEndpoint.title}`,
      '',
      '```http',
      'GET /api/items',
      '```',
      '',
      '| Parameter | Type     | Description                |',
      '| :-------- | :------- | :------------------------- |',
      `|${apiEndpoint.parameter.name} | ${apiEndpoint.parameter.type} | ${apiEndpoint.parameter.description}|`,
    ].join('\n');
  }

  private mapFunction(apiFunction: ApiFunction): string {
    return [
      `#### ${apiFunction.name}(${apiFunction.parameters.join(', ')})`,
      '',
      apiFunction.description,
    ].join('\n');
  }

  protected synthesizeContent(): string[] {
    const content = [`## ${this.title}`];

    if (this._apiEndpoints.length) {
      content.push('', this._apiEndpoints.map(this.mapEndpoint).join('\n\n'));
    }

    if (this._apiFunctions.length) {
      content.push('', this._apiFunctions.map(this.mapFunction).join('\n\n'));
    }

    return content;
  }
}

export function apiReferenceSection(title?: string) {
  return new ApiReference(title);
}
