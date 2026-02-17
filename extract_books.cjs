const fs = require('fs');
const content = fs.readFileSync('old-quasar/src/pages/books.vue', 'utf8');
const textContentMatch = content.match(/textContent: ({[\s\S]*?})\n\s*}/);
if (textContentMatch) {
  let textContentStr = textContentMatch[1];
  const books = {};
  const bookRegex = /'([^']+)': \`([\s\S]*?)\`/g;
  let match;
  while ((match = bookRegex.exec(textContentStr)) !== null) {
    books[match[1]] = match[2].trim();
  }
  fs.writeFileSync('src/data/content/books.json', JSON.stringify(books, null, 2));
}
