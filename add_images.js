const fs = require('fs');

let content = fs.readFileSync('src/data/products.ts', 'utf8');

// Use a simple regex to insert images field right after subcategory
content = content.replace(/subcategory: ('.*?'),/g, (match, subCat) => {
  // Extract product ID conceptually if possible, or just generate standard deterministic image URLs
  // We don't have id in this regex match easily, let's just generate random seed per match
  const rand1 = Math.floor(Math.random() * 1000);
  const rand2 = Math.floor(Math.random() * 1000);
  return `${match}\n    images: ['https://picsum.photos/seed/aurel_${rand1}/800/1200', 'https://picsum.photos/seed/aurel_${rand2}/800/1200'],`;
});

fs.writeFileSync('src/data/products.ts', content);
console.log('Images added to products');
