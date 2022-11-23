<script setup lang="ts">
import {onMounted, ref} from "vue";
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import {useRoute} from "vue-router";
import {getContent} from "@/apis/content";
import {Base64} from "js-base64";
import type {Response} from "@/types/types";
import type {ContentOutput} from "@/types/schemas/resource";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// OR | AND
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

const route = useRoute()
const content = ref()
onMounted(() => {
  getContent(route.params.id,
      (res: Response<ContentOutput>) => {
    content.value = Base64.decode(res.data.content as string)
  }, ()=>{})
})
</script>

<template>
  <v-app-bar
    flat
    style="position:fixed;"
    density="compact"
    class="bg-blue-grey-lighten-5"
  >
    <navigate-button
      title="Home"
      prepend-icon="mdi-home"
      @click="$router.push('/')"
    />
    <v-spacer/>
    <navigate-button
      title="About"
      prepend-icon="mdi-information-outline"
    />
  </v-app-bar>
  <div class="bgd"/>
  <div class="ql-container">
    <div class="ql-editor">
      <div v-html="content"/>
    </div>
  </div>
</template>

<style scoped>
.bgd {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
  background-image: linear-gradient(to right bottom, #ace0f9 0%, #fff1eb 100%);
}
</style>