const fs = require('fs');
const content = fs.readFileSync('old-quasar/src/mixins/ScriptMixin.js', 'utf8');

function extractArray(name) {
  const match = content.match(new RegExp(name + ": '([^']*)'\\.split\\(' '\\)"));
  if (match) return match[1].split(' ');
  return [];
}

const data = {
  vowels: extractArray('vowels'),
  vowelska: extractArray('vowelska'),
  consonants: extractArray('consonants'),
  consonantska: extractArray('consonantska'),
  vowelSigns: extractArray('vowelSigns'),
  vowelSignsG: extractArray('vowelSignsG'),
  vowelSignskas: extractArray('vowelSignskas'),
  conjuncts2: extractArray('conjuncts2'),
  conjuncts3: extractArray('conjuncts3'),
  conjuncts4: extractArray('conjuncts4'),
  conjuncts5: extractArray('conjuncts5'), // This might be a string not split
  confusables: [
    ['ए', 'झ'],
    ['ङ', 'ट'],
    ['म', 'स', 'श'],
    ['प', 'थ', 'ष']
  ],
  variantsCompounds: extractArray('variantsCompounds'),
  specialConjuncts: extractArray('specialConjuncts'),
  specialRepha: extractArray('specialRepha')
};

// Fix conjuncts5 which is not split in the source
if (data.conjuncts5.length === 1 && data.conjuncts5[0] === 'र्त्स्न्य') {
  // already ok
} else {
    const match5 = content.match(/conjuncts5: '([^']*)'/);
    if (match5) data.conjuncts5 = [match5[1]];
}

fs.writeFileSync('src/data/content/characters.json', JSON.stringify(data, null, 2));
