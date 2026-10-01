import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('content/services.ts', 'utf-8');

content = content.replace(
  'day: "Quinta-feira",',
  'day: "Quarta-feira",'
);

writeFileSync('content/services.ts', content);
