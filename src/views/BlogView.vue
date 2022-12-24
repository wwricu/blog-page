<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import {useRoute} from "vue-router";
import {getContentAPI} from "@/apis/content";
import {Base64} from "js-base64";
import type {ContentOutput} from "@/types/schemas/resource";
import BlogTitleCard from "@/components/cards/BlogTitleCard.vue";
import CustomFooter from "@/components/cards/CustomFooter.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import AboutCard from "@/components/cards/AboutCard.vue";

const route = useRoute()
const blog = ref()
const content = ref()
const height = ref()
onMounted(() => {
  getContentAPI(route.params.id,
      (data: ContentOutput) => {
    blog.value = data
    content.value = Base64.decode(blog.value.content as string)
    nextTick(() => {
      getHeight()
    })
  }, ()=>{})
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
      @click="$router.push('/')"
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
    width="1000"
    class="mx-auto ql-container pt-16"
    v-scroll="parallel"
  >
    <div class="ql-editor">
      <div v-html="content"/>
      <v-divider class="my-16" color="grey-darken-3"/>
      <custom-footer
        :text-color="'text-grey-darken-3'"
      />
    </div>
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

.ql-container {
  /*background-color: rgba(236, 239, 241, 0.75);*/
  /*background-color: rgba(250, 251, 241, 0.8);*/
  background: transparent;
  font-size: 16px;
}

/*.bgd-bottom {*/
/*  top: 0;*/
/*  left: 0;*/
/*  width: 100vw;*/
/*  height: 100vh;*/
/*  position: fixed;*/
/*  z-index: -110;*/
/*  background: whitesmoke;*/
/*  background-image:*/
/*      linear-gradient(rgba(0,0,0,.3) 1px, transparent 0),*/
/*      linear-gradient(90deg, rgba(0,0,0,.3) 1px, transparent 0),*/
/*      linear-gradient(black 1px, transparent 0),*/
/*      linear-gradient(90deg, black 1px, transparent 0);*/
/*  background-size:*/
/*      15px 15px,*/
/*      15px 15px,*/
/*      75px 75px,*/
/*      75px 75px;*/
/*}*/
</style>
