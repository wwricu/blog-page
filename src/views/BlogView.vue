<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import {useRoute, useRouter} from "vue-router";
import {getContentAPI} from "@/apis/content";
import {Base64} from "js-base64";
import type {ContentOutput} from "@/types/schemas/resource";
import BlogTitleCard from "@/components/cards/BlogTitleCard.vue";
import CustomFooter from "@/components/cards/CustomFooter.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import AboutCard from "@/components/cards/AboutCard.vue";
import 'vditor/dist/index.css';
import VditorPreview from 'vditor'
// import VditorPreview from 'vditor/dist/method.min.js'
import {useDisplay} from "vuetify";
import {Resize, Scroll} from "vuetify/directives";


const vResize = Resize
const vScroll = Scroll
const route = useRoute()
const router = useRouter()
const blog = ref()
const content = ref()
const height = ref()
const vditor = ref()
onMounted(() => {
  getContentAPI(route.params.id,
      (data: ContentOutput) => {
    blog.value = data
    content.value = Base64.decode(blog.value.content as string) // md
    VditorPreview.preview(
        document.getElementById('vditor')! as HTMLDivElement,
        content.value,
        {
          mode: 'light',
          anchor: 1,
          hljs: {
            style: 'dracula',
          },
          after: () => {
            getHeight()
            const observer = new ResizeObserver(() => {
              getHeight();
            });
            observer.observe(vditor.value);
          }
        })
  }, () => {})
})

const { name } = useDisplay()
const cardWidth = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm': return 'w-auto'
  }
  return 1000
})

const getHeight = () => {
  let body = document.body
  let html = document.documentElement
  height.value = Math.max(body.scrollHeight,
                          body.offsetHeight,
                          html.clientHeight,
                          html.scrollHeight,
                          html.offsetHeight)
};

const top = ref(0)
const parallel = () => {
  let scrollY = document.documentElement.scrollTop
             || document.body.scrollTop
  top.value = 0.5 * scrollY
}

const aboutDialog = ref(false)
const switchAbout = () => {
  aboutDialog.value = !aboutDialog.value
}

const toTop = () => {
  window.scrollTo(0,0)
}
</script>

<template>
  <v-app-bar
    density="compact"
    class="bg-blue-grey-lighten-5"
  >
    <navigate-button
      title="Home"
      prepend-icon="mdi-home"
      @click="router.push('/')"
    />
    <v-spacer/>

    <v-spacer/>
    <navigate-button
      title="About"
      prepend-icon="mdi-information-outline"
      :menu="aboutDialog"
      @click="switchAbout()"
    />
  </v-app-bar>
  <blog-title-card
    v-if="blog !== undefined"
    :blog="blog"
  />
  <v-dialog v-model="aboutDialog">
    <about-card @confirm="switchAbout()"/>
  </v-dialog>
  <v-sheet
    :width="cardWidth"
    class="mx-auto vditor-container pt-16 pr-4 pr-md-0"
    v-scroll="parallel"
    v-resize="getHeight"
  >
    <div id="vditor" ref="vditor"/>
    <v-divider class="my-16" color="grey-darken-3"/>
    <custom-footer
      :text-color="'text-grey-darken-3'"
    />
  </v-sheet>
  <right-bottom-buttons>
    <v-btn
      density="comfortable"
      color="primary"
      icon="mdi-arrow-up"
      @click="toTop()"
    />
  </right-bottom-buttons>
  <div class="bgd"/>
</template>

<style scoped>
.bgd {
  width: 100vw;
  height: v-bind(height + 'px');
  position: fixed;
  z-index: -100;
  top: v-bind(-top + 'px');
  background: #fafbf1 repeat-y url('../assets/blog_background.png');
  -webkit-background-size: 100% auto;
  background-size: 100% auto;
}

#vditor {
  overflow: visible !important;
}

.vditor-container {
  background: transparent;
}
</style>
