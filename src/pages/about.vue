<template>
    <q-page padding>
        <div class="q-mb-lg">
          <div class="invoc q-ma-sm q-display-1"><span class="sharada">𑆤𑆩𑆯𑇀𑆯𑆳𑆫𑆢𑆳𑆪𑆽 </span> </div>
        </div>
        <div>
        <div class="q-body-1 quote-comm q-mb-md sharada">
              𑆤𑆩𑆱𑇀𑆠𑆼 𑆯𑆳𑆫𑆢𑆼 𑆢𑆼𑆮𑆴 𑆑𑆳𑆯𑇀𑆩𑆵𑆫𑆥𑆶𑆫𑆮𑆳𑆱𑆴𑆤𑆴 𑇅 <br/>
𑆠𑇀𑆮𑆳𑆩𑆲𑆁 𑆥𑇀𑆫𑆳𑆫𑇀𑆡𑆪𑆼 𑆤𑆴𑆠𑇀𑆪𑆁 𑆮𑆴𑆢𑇀𑆪𑆳𑆢𑆳𑆤𑆁 𑆖 𑆢𑆼𑆲𑆴 𑆩𑆼 𑇆
        </div>
        <div class="q-body-1 quote-comm q-mb-md devanagari">
नमस्ते शारदे देवि काश्मीरपुरवासिनि । <br/>

त्वामहं प्रार्थये नित्यं विद्यादानं च देहि मे ॥
        </div>
        <div class="q-body-1 quote-comm q-mb-md iast">
namaste śārade devi kāśmīrapuravāsini . <br/>
tvāmahaṃ prārthaye nityaṃ vidyādānaṃ ca dehi me ..
        </div>

        </div>
        <br/>
        <div class="q-body-1">This is meant to be a portal for the Sharada script. It provides various functionalities such as converting Devanagari/Romanized text into Sharada, directly composing in Sharada and various learning resources to practice Sharada.</div> <br/>

        <div class="q-body-1">The source code for the site is released under GNU AGPL and can be found at <a href="https://github.com/virtualvinodh/satisarsite">Github</a> The font is released under SIL OFL and can be found at <a href="https://github.com/virtualvinodh/satisarsharada">Github</a> .</div>
        <br/>
        <div class="q-body-1">The site and font were developed in collaboration with the <a href="http://www.shardalipi.com/">Core Sharada Team Foundation</a> (info@shardalipi.com)</div>

        <div class="q-display-1 q-mt-lg q-mb-md">Feedback</div>
        <div class="q-body-1">Please send your feedback/comments to vinodh@virtualvinodh.com or info@shardalipi.com</div>

  </q-page>
</template>

<script>
import QToolTip from 'quasar'

export default {
  // name: 'PageName',
  components: {
    QToolTip
  }
}
</script>

<style>
.invoc {
  display:inline;
  font-size:225%;
}
.invoc-img {
  margin-top: -30px;
  display:inline-block;
}
.quote-comm {
  text-align: left;
  font-size: 16px;
}
.quote-comm.sharada {
  text-align: left;
  font-size: 20px;
}
</style>
