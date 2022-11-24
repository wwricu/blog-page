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
import bgdImg from "@/assets/background.jpg"

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

  <v-parallax :src="bgdImg">
    <v-sheet
      width="1000"
      class="mx-auto ql-container"
    >
      <blog-title-card
        class="mb-16"
        v-if="blog !== undefined"
        :blog="blog"
      />
      <div class="ql-editor">
        <div v-html="content"/>
        <v-divider color="grey-darken-3"/>
        <custom-footer
          class="mt-8"
          :text-color="'text-grey-darken-3'"
        />
      </div>
    </v-sheet>
  </v-parallax>
</template>

<style scoped>
.ql-container {
  /*background-color: rgba(236, 239, 241, 0.75);*/
  background-color: rgba(255, 255, 255, 0.3);
}
</style>