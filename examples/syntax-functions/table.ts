import { table } from 'markdown-as-code';

table<'email' | 'description'>({
  rows: [
    {
      email: 'hr@example.com',
      description: 'Human Resources email',
    },
    {
      email: 'support@example.com',
      description: 'Customer Support email',
    },
  ],
});
