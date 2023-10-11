type TableBlock<Columns extends string> = {
  rows: Array<Record<Columns, string>>;
};

/**
 * Creates a markdown table block.
 * @param rows - An array of objects representing the rows of the table.
 * @returns A markdown table string.
 * @example
 * ```typescript
 * tableBlock<'email' | 'description'>({
 *  rows: [
 *    {
 *      email: 'test@example.com',
 *      description: 'test email used in service',
 *    },
 *  ],
 * });
 * ```
 */
export const tableBlock = <Columns extends string>({
  rows,
}: TableBlock<Columns>) => {
  const columns = Object.keys(rows[0]) as Columns[];
  return [
    `| ${columns.map((header) => header.toUpperCase()).join(' | ')} |`,
    `| ${columns.map(() => '---').join(' | ')} |`,
    ...rows.map(
      (row) => `| ${columns.map((header) => row[header]).join(' | ')} |`
    ),
  ].join('\n');
};
