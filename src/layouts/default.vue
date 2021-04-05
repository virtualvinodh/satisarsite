<template>
  <q-layout view="hHr Lpr fFf">
    <q-window-resize-observable @resize="onResize" />

    <q-layout-header class="">
      <q-toolbar
        color="dark"
      >
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click.native="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />

        </q-btn>

        <div class="q-ma-xs">
          <q-btn
            round
            size="16px"
            color="dark"
            to="/editor"
          >
            <span class="sharada" style="font-size:220%">𑆏𑆀</span>
          </q-btn>
        </div>
        <q-toolbar-title>
          Satisar : <span class="sharada">𑆱𑆠𑆵𑆱𑆫𑇀</span>
          <div slot="subtitle">A portal for Sharada </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      class=""
      side="left"
      width="200"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      > <!-- link to other tools -->
        <!-- Options to create pseudo epigraphs -->
        <!-- Icon -->
        <q-item to="/editor">
          <q-item-side icon="edit" />
          <q-item-main label="Editor" sublabel="𑆬𑆼𑆒𑆑𑆩𑇀" class="sharada"/>
        </q-item>
        <q-item to="/image"  v-if="$q.platform.is.desktop">
          <q-item-side icon="image" />
          <q-item-main label="Image" sublabel="𑆖𑆴𑆠𑇀𑆫𑆩𑇀" class="sharada" />
        </q-item>
        <q-item to="/learn-sharada">
          <q-item-side icon="school" />
          <q-item-main label="Learn" sublabel="𑆥𑆜𑆠" class="sharada" />
        </q-item>
        <q-collapsible icon="how to reg" label="Practice" sublabel="𑆃𑆨𑇀𑆪𑆳𑆱𑆁 𑆑𑆶𑆫𑆶𑆠" class="sharada" >
            <q-item to="/match-letter">
              <q-item-main label="Match" sublabel="" />
            </q-item>
            <q-item to="/memory-cards">
              <q-item-main label="Memorize" sublabel="𑆱𑇀𑆩𑆫𑆠" class="sharada"/>
            </q-item>
            <q-item to="/fill-sharada">
              <q-item-main label="Fill" sublabel="" />
            </q-item>
            <q-item to="/flipcards-shuffle">
              <q-item-main label="Flipcards" sublabel="" />
            </q-item>
        </q-collapsible>
         <q-item to="/reading-practice"  v-if="!$q.platform.is.cordova">
          <q-item-side icon="book" />
          <q-item-main label="Reading Practice" sublabel="𑆥𑆜𑆤 𑆃𑆨𑇀𑆪𑆳𑆱𑆂" class="sharada" />
        </q-item>
         <q-item to="/font-keyboard"  v-if="!$q.platform.is.cordova">
          <q-item-side icon="cloud download" />
          <q-item-main label="Font & Keyboard" sublabel="" class="sharada" />
        </q-item>
         <q-item @click.native="openURL('http://aksharamukha.appspot.com/converter?target=Sharada')" link>
          <q-item-side icon="developer board" />
              <q-item-main label="Aksharamukha" sublabel="𑆃𑆑𑇀𑆰𑆫𑆩𑆶𑆒" class="sharada" />
        </q-item>
         <q-item to="/about">
          <q-item-side icon="info" />
          <q-item-main label="About" sublabel="" />
        </q-item>
      </q-list>
      <br/>
<social-sharing url="http://satisar.appspot.com"
                      title="Satisar"
                      description="A portal for the Sharada script"
                      quote="A portal for the Sharada script"
                      hashtags="sharada,script,indic,epigraphy"
                      inline-template  v-if="!$q.platform.is.cordova">
  <div class="social">
      <network network="facebook" class="q-ma-md cursor-pointer">
        <img src="../statics/facebook.svg" width="20px">
      </network>
      <network network="whatsapp" class="q-ma-md mobile-only">
        <img src="../statics/whatsapp.svg" width="20px">
      </network>
      <network network="twitter" class="q-ma-md cursor-pointer">
        <img src="../statics/twitter.svg" width="20px">
      </network>
  </div>
</social-sharing>
    </q-layout-drawer>

    <q-page-container class="page">
      <span v-if="!$q.platform.is.cordova">
        <div :class="$q.platform.is.mobile ? 'alert2': 'alert'" v-if="false" class="q-ma-sm">
        <q-alert
            color="grey-7"
            icon="euro_symbol"
            appear
            :actions="[{ label: 'Hide', handler: hideAlert }]"
            class="q-mb-sm"
          > <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HZVFCCB2F4SL6&source=url">Donate</a> to support Jinavani! </q-alert>
        </div>
        </span>
      <router-view/>
    </q-page-container>
    <q-layout-footer v-show="showFooter" class="print-hide">
        <q-toolbar color="tertiary" class="footer-quote">
          © 2021 <a href="http://www.virtualvinodh.com">Vinodh Rajan</a>&nbsp;&nbsp;&nbsp;vinodh@virtualvinodh.com. This software is released under GNU AGPL 3.0 license.
          <q-btn
          round
          size="md"
          text-color="white"
          color="dark"
          class="print-only q-ml-sm q-mr-sm"
        >
          </q-btn>
        </q-toolbar>
    </q-layout-footer>

  </q-layout>
</template>

<script>
import { openURL, QLayoutFooter, QTooltip, QWindowResizeObservable, QCollapsible, QAlert } from 'quasar'
import SocialSharing from 'vue-social-sharing'

export default {
  name: 'LayoutDefault',
  components: {
    QLayoutFooter,
    QTooltip,
    QWindowResizeObservable,
    QCollapsible,
    SocialSharing,
    QAlert
  },
  data () {
    return {
      leftDrawerOpen: true,
      visibleAlert2: true,
      showFooter: true
    }
  },
  mounted: function () {
    if (localStorage.visibleAlert2) {
      this.visibleAlert2 = JSON.parse(localStorage.visibleAlert2)
    }
  },
  methods: {
    openURL,
    hideAlert: function () {
      this.visibleAlert2 = false
      localStorage.visibleAlert2 = JSON.stringify(this.visibleAlert2)
    },
    onResize: function (size) {
      if (size.width < 992) {
        this.showFooter = false
      } else {
        this.showFooter = true
      }
    }
  }
}
</script>

<style>
.alert {
}
.alert2 {
}
.alert a:link {
  color:white;
}
.alert a:visited {
  color:white;
}
.alert2 a:link {
  color:white;
}
.alert2 a:visited {
  color:white;
}

.footer-img {
  height: 20px;
}
.footer-quote {
  font-size: 12px;
}
.page {
  margin-left: 10px;
}
.footer-quote {
  text-align: right;
  float:center;
}
.quotef {
  float: center;
}
.demo1 {
    color: white;
    background-color: #424242;
    text-shadow: 0px 1px 0px rgba(0,0,0,.5);
}
.social {
  text-align: center;
}
.q-body-1 {
  line-height: 1.75em;
}
.sharada {
  font-family: 'Satisar Sharada';
  line-height: 1.6;
}
.devanagari {
  font-family: 'Noto Sans';
}
.iast {
  font-family: 'Noto Sans';
}
.compact {
  font-feature-settings: "ss01";
}
@font-face {
  font-family: 'Satisar Sharada';
  src: url('https://cdn.jsdelivr.net/gh/virtualvinodh/satisarsharada/Sharada.ttf');
}
@font-face {
  font-family: 'Noto Sans';
  src: url('https://cdn.jsdelivr.net/gh/virtualvinodh/aksharamukha-notomirror/merged/NotoSansDevanagari-Regular.ttf');
}
</style>
