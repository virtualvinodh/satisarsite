export const SyllabaryUtils = {
  syllabize(word) {
    if (!word) return []
    // This regex splits a Devanagari word into its syllables (aksaras)
    const regex = /([कखगघङचछजझञटठडढणतथदधनऩपफबभमयरऱलळऴवशषसहच़छ़]([्][कखगघङचछजझञटठडढणतथदधनऩपफबभमयरऱलळऴवशषसहच़छ़])*[ऺऻािीुूृॄॅॆेैॊोौॖॗॢॣ्]?[ंःँ]?)|([।॥])|(\d+)|([०१२३४५६७८९॰]+)|(ॐ)|([अआइईउऊऋॠऌॡएऐओऔॳॴॶॷऎऒ][ंःँ]?)/g

    // Using matchAll for better reliability in some environments
    const matches = Array.from(word.matchAll(regex))
    return matches
      .map(m => m[0])
      .filter(x => x != null && x[0] !== '्' && x !== '')
  }
}
