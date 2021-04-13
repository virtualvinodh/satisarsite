<template>
  <q-page padding>
    <div class="q-display-1 q-mt-lg q-mb-md">Satisar Sharada Font</div>
    <div class="q-body-1">The font can downloaded from
      <a href="https://github.com/virtualvinodh/satisarsharada/raw/main/Sharada.ttf">here</a>.
    </div>
    <div  class="q-display-1 q-mt-lg q-mb-md">Instructions</div>
    <div class="q-body-1">Satisar Sharada does not yet render completely fine in Microsoft applications. The dist feature has some issues and this can result in the  rendered text having some overlapping syllables. This may have to be fixed manually by inserting a space at the appropriate locations.. Please download and install <a href="https://www.libreoffice.org/download/download/" target="_blank">LibreOffice</a>, if you'd like compose documents in Sharada.</div> <br/>
    <img src="../statics/winword-sample.png" width="600px" /> <br/>
    <div class="q-body-1">After installing LibreOffice, you can either copy the Sharada text composed in this site to LibreOffice Writer or, alternatively, download a Keyman keyboard to compose in Sharada directly in your computer. The download links for the keyboard and the corresponding usage instructions are given below. Either way, please make sure that the font is set to "Satisar Sharada", else the text will appear as boxes. </div> <br/>
    <div class="q-body-1">Sometimes, LibreOffice might switch fonts while pasting the Sharada text and display it as boxes. In such cases, please reselect the text and set the font to "Satisar Sharada" explicitly. </div> <br/>
    <div class="q-body-1">Satisar comes in two varieties, Normal and Compact. Due to extensive stacking, Sharada requires increased interline spacing if the text has 3 or more stacked consonants. So, to reduce that we have added a stylistic set (SS01) that uses compacified glyphs to reduce the interline spacing. To activate this, set Satisar Sharada:ss01 as the font in LibreOffice. </div> <br/>
    <div class="q-body-1">Satisar (Normal) </div>
    <img src="../statics/libreoffice_normal.png" width="600px" /> <br/>
    <br/>
    <div class="q-body-1">Satisar (Compact) </div>
    <img src="../statics/libreoffice_compact.png" width="600px" /> <br/>

     <div class="q-body-1">You may have to adjust the line height to ensure that the lines do not collide with each other, particularly while rendering Sanskrit texts with complex Samyuktakasharas/Conjuncts </div>
    <div class="q-display-1 q-mt-lg q-mb-md">Offline Keyboard</div>
    <div class="q-body-1"><a href="https://github.com/virtualvinodh/sharada-keyman-keyboard/blob/main/build/keymandesktop-sharada.exe?raw=true">Integrated Keyman
    Keyboard (if you don't have Keyman installed in your system)</a></div> <br/>
     <div class="q-body-1">Double-clicking on the downloaded .exe file might result in a dialogue box that asks for your confirmation to proceed with the installation. Please select 'Yes' </div> <br/>
    <div class="q-body-1"><a href="https://github.com/virtualvinodh/sharada-keyman-keyboard/raw/main/build/sharada.kmp">Sharada Keyman Package (if Keyman is already installed)</a></div>
    <div class="q-body-1"><a href="https://github.com/virtualvinodh/sharada-keyman-keyboard/blob/main/source/how_to_use.pdf" target="_blank">Keyman Keyboard Instructions</a></div>
    <div class="q-display-1 q-mt-lg q-mb-md">App</div>
    <div class="q-body-1">Android app coming soon...</div>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
.q-body-1 {
  line-height: 1.75em;
  font-color: red;
}
</style>
