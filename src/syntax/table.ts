type Table<Columns extends string> = {
  rows: Array<Record<Columns, string>>;
};

/**
 * Creates a markdown table block.
 * @param rows - An array of objects representing the rows of the table.
 * @returns A markdown table string.
 * @example
 * ```typescript
 * table<'email' | 'description'>({
 *  rows: [
 *    {
 *      email: 'test@example.com',
 *      description: 'test email used in service',
 *    },
 *  ],
 * });
 * ```
 */
export const table = <Columns extends string>({ rows }: Table<Columns>) => {
  const columns = Object.keys(rows[0]) as Columns[];
  return [
    `| ${columns.map((header) => header.toUpperCase()).join(' | ')} |`,
    `| ${columns.map(() => '---').join(' | ')} |`,
    ...rows.map(
      (row) => `| ${columns.map((header) => row[header]).join(' | ')} |`
    ),
  ].join('\n');
};
