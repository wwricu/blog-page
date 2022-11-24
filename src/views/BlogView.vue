<script setup lang="ts">
import {onMounted, ref} from "vue";
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import {useRoute} from "vue-router";
import {getContent} from "@/apis/content";
import {Base64} from "js-base64";
import type {Response} from "@/types/types";
import type {ContentOutput} from "@/types/schemas/resource";
import BlogTitleCard from "@/components/cards/BlogTitleCard.vue";
import CustomFooter from "@/components/cards/CustomFooter.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";

const route = useRoute()
const blog = ref()
const content = ref()
onMounted(() => {
  getContent(route.params.id,
      (res: Response<ContentOutput>) => {
    blog.value = res.data
    content.value = Base64.decode(blog.value.content as string)
  }, ()=>{})
})
const toTop= () => {
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
    />
  </v-app-bar>
  <blog-title-card
    v-if="blog !== undefined"
    :blog="blog"
  />
  <v-sheet
    width="1000"
    class="mx-auto ql-container pt-16"
  >
    <div class="ql-editor">
      <div v-html="content"/>
      <v-divider color="grey-darken-3"/>
      <custom-footer
        class="mt-8"
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
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -100;
  top: 0;
  left: 0;
  /*background-image: linear-gradient(to right bottom, #ace0f9 0%, #fff1eb 100%);*/
  background-color: #fafbf1;
}
.ql-container {
  /*background-color: rgba(236, 239, 241, 0.75);*/
  background-color: rgba(255, 255, 255, 0.5);
}
</style>