import { tableBlock } from 'markdown-as-code';

tableBlock<'email' | 'description'>({
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
