import Sanscript from '@sanskrit-coders/sanscript'
import mappings from '../data/scripts/mappings.json'
import rules from '../data/scripts/rules.json'

export const TransliterationService = {
  transliterate(text, from, to) {
    if (!text) return ''

    // Standard transliteration using Sanscript
    let result = Sanscript.t(text, from, to)

    // Apply custom rules if they exist for the target script
    if (rules[to] && rules[to].post_fixes) {
      rules[to].post_fixes.forEach(([search, replace]) => {
        const regex = new RegExp(search, 'g')
        result = result.replace(regex, replace)
      })
    }

    return result
  },

  // Generic conversion using the mappings
  convert(text, from, to) {
    if (!text) return ''
    let result = text

    // This is a simple 1-to-1 replacement based on categories
    // Useful for single characters or simple strings
    const fromMap = mappings[from]
    const toMap = mappings[to]

    if (fromMap && toMap) {
      Object.keys(fromMap).forEach(category => {
        const fromList = fromMap[category]
        const toList = toMap[category]
        if (fromList && toList) {
          fromList.forEach((char, index) => {
            if (char && toList[index]) {
              const regex = new RegExp(char, 'g')
              result = result.replace(regex, toList[index])
            }
          })
        }
      })
    }

    return result
  }
}
