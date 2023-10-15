import { table } from './table.js';

describe('tableBlock', () => {
  it('returns table', () => {
    expect(
      table<'item' | 'comments'>({
        rows: [{ item: 'email', comments: 'test *email* used in service' }],
      }),
    ).toMatchInlineSnapshot(`
      "| ITEM | COMMENTS |
      | --- | --- |
      | email | test *email* used in service |"
    `);
  });
});
