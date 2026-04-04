const fs = require('fs');
let content = fs.readFileSync('src/data/products.ts', 'utf8');

// Replace prices
content = content.replace(/price: (\d+),/g, (match, p1) => {
  return `price: ${Math.floor(parseInt(p1) * 315 / 100) * 100},`;
});

// Replace original prices
content = content.replace(/originalPrice: (\d+),/g, (match, p1) => {
  return `originalPrice: ${Math.floor(parseInt(p1) * 315 / 100) * 100},`;
});

fs.writeFileSync('src/data/products.ts', content);
console.log('Prices updated successfully.');
