import { tableBlock } from './table-block.js';

describe('tableBlock', () => {
  it('returns table', () => {
    expect(
      tableBlock<'item' | 'comments'>({
        rows: [{ item: 'email', comments: 'test *email* used in service' }],
      })
    ).toMatchInlineSnapshot(`
      "| ITEM | COMMENTS |
      | --- | --- |
      | email | test *email* used in service |"
    `);
  });
});
