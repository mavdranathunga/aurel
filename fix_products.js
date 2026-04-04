const fs = require('fs');

let content = fs.readFileSync('src/data/products.ts', 'utf8');

// Replace all lines that look like images: ['/images/products...'] with empty string
const lines = content.split('\n');
const newLines = lines.filter(line => !line.includes('/images/products/'));

fs.writeFileSync('src/data/products.ts', newLines.join('\n'));
console.log('Fixed overlapping images issue in products.ts');
