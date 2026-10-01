const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('content/services.ts', 'utf-8');

content = content.replace(
  'day: "Quinta-feira",',
  'day: "Quarta-feira",'
);

writeFileSync('content/services.ts', content);

let footer = readFileSync('components/layout/Footer.tsx', 'utf-8');
footer = footer.replace(
  'Quinta-feira às 19:30',
  'Quarta-feira às 19:30'
);
footer = footer.replace(
  'Quintas: 19h30',
  'Quartas: 19h30'
);

writeFileSync('components/layout/Footer.tsx', footer);

let location = readFileSync('components/home/LocationSection.tsx', 'utf-8');
location = location.replace(
  'Quinta-feira às 19:30',
  'Quarta-feira às 19:30'
);
location = location.replace(
  'Quintas: 19h30',
  'Quartas: 19h30'
);

writeFileSync('components/home/LocationSection.tsx', location);
