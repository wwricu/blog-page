<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getSubFolders} from "@/apis/folder";
import {Base64, encode} from "js-base64";
import {getContent} from "@/apis/content";
import {useRoute} from "vue-router";

const quillEditor = ref()
const content = ref("")

onMounted(()=> {
  getSubFolders((res: any)=>{
    categories.value = res.data
    findContent()
  }, (res: any)=>{
    console.log(res)
  })
})

const title = ref()
const categories = ref()
const categorySelect = ref()

const route = useRoute()
function findContent() {
  getContent(route.params.id, (res: any)=>{
    if (res.data.length === 0) return
    contentData.value = res.data[0]
    title.value = res.data[0].title
    if (res.data[0].content !== null) {
      quillEditor.value.setContents(Base64.decode(res.data[0].content))
    }

    for (const cat of categories.value) {
      if (cat.id === res.data[0].parent_id) {
        categorySelect.value = cat
        break
      }
    }
    // get category
  }, ()=>{})
}

const contentData = ref()
defineExpose({
  getEditorContents() {
    contentData.value.title = title.value
    contentData.value.content = encode(quillEditor.value.getContents())
    if (categorySelect.value !== undefined
        && categorySelect.value.id !== undefined) {
      contentData.value.parent_id = categorySelect.value.id
    }
    return contentData.value
  }
})

</script>
<template>
  <v-card
    max-width="800px"
  >
<!--    <v-btn @click="printContent">test</v-btn>-->
    <v-container class="mt-n2 mb-n6">
      <v-row>
        <v-col cols="8">
          <v-text-field
            density="compact"
            variant="underlined"
            color="indigo"
            label="Title"
            v-model="title"
          />
        </v-col>
        <v-col cols="4" class="align-self-end">
          <v-select
            return-object
            item-title="title"
            item-value="id"
            density="compact"
            variant="underlined"
            color="indigo"
            label="Category"
            :items="categories"
            v-model="categorySelect"
          />
        </v-col>
      </v-row>
    </v-container>
    <QuillEditor
      class="ql-container"
      ref="quillEditor"
      v-model:content="content"
      theme="snow"
      toolbar="essential"
      content-type="html"
    />
  </v-card>
</template>

<style scoped>
/deep/ .ql-container.ql-snow {
  height: calc(100vh - 2.8rem - 48px);
}
/deep/ .ql-editor {
  overflow-y: scroll;
}
</style>