<script setup lang="ts">
import {ref, onMounted, Ref} from "vue";
import {getSubFolders} from "@/apis/folder";
import {Base64, encode} from "js-base64";
import {getContentAPI} from "@/apis/content";
import {useRoute} from "vue-router";
import {getTagAPI} from "@/apis/tag";
import type {ContentOutput, ResourcePreview} from "@/types/schemas/resource";
import type {Tag} from "@/types/schemas/tag";
import 'highlight.js/styles/github.css'
import 'highlight.js/lib/common'
import hljs from 'highlight.js'
import {getCategoryAPI} from "@/apis/category";

const quillEditor = ref()
const content = ref("")
const editorOption = {
  placeholder: '',
  modules: {
    toolbar: [
      { 'header': [1, 2, 3, false] },
      { 'font': [] },
      'bold',
      'italic',
      'underline',
      'blockquote',
      'code-block',
      'link',
      { 'align': [] },
      { 'color': [] },
    ],
    syntax: {
      highlight: (text: any) => {
        return hljs.highlightAuto(text).value
      }
    }
  }
}

onMounted(()=> {
  getCategoryAPI(null,(tags: Tag[]) => {
    categories.value = tags
    findContent()
  }, (res: any) => {
    console.log(res)
  })
  getTagAPI({}, (res: any)=>{
    tags.value = res.data
  }, ()=>{})
})

const tags = ref()
const tagSelect = ref()
const categories: Ref<Array<Tag>> = ref([])
const categorySelect = ref()
const status = ref([
  {
    title: 'draft',
    url: '/draft'
  },
  {
    title: 'publish',
    url: '/post'
  },
])
const statusSelect = ref()

const title = ref()
const route = useRoute()
function findContent() {
  getContentAPI(route.params.id, (data: ContentOutput) => {
    contentData.value = data
    title.value = data.title
    if (data.content != null) {
      quillEditor.value.setContents(Base64.decode(data.content))
    }

    for (const st of status.value) {
      if (data.parent_url === st.url) {
        statusSelect.value = st
        break
      }
    }

    for (const cat of categories.value) {
      if (cat.name === data.category_name) {
        categorySelect.value = cat
        break
      }
    }
    tagSelect.value = data.tags
  }, ()=>{})
}

const contentData = ref()
defineExpose({
  getEditorContents() {
    contentData.value.title = title.value
    contentData.value.content = encode(quillEditor.value.getContents())
    contentData.value.tags = tagSelect.value
    contentData.value.parent_url = statusSelect.value.url

    if (categorySelect.value !== undefined
        && categorySelect.value.name !== undefined) {
      contentData.value.category_name = categorySelect.value.name
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
            item-value="url"
            density="compact"
            variant="underlined"
            color="indigo"
            label="Status"
            :items="status"
            v-model="statusSelect"
          />
        </v-col>
        <v-col cols="6" class="align-self-end">
          <v-select
            return-object
            item-title="name"
            item-value="id"
            density="compact"
            variant="underlined"
            color="indigo"
            label="Category"
            :items="categories"
            v-model="categorySelect"
          />
        </v-col>
        <v-col cols="6" class="align-self-end mt-n4">
          <v-combobox
            chips
            multiple
            clearable
            hide-selected
            closable-chips
            return-object
            item-title="name"
            item-value="id"
            label="Tags"
            density="compact"
            variant="underlined"
            color="indigo"
            v-model="tagSelect"
            :items="tags"
          />
        </v-col>
      </v-row>
    </v-container>
    <QuillEditor
      class="ql-container"
      ref="quillEditor"
      v-model:content="content"
      theme="snow"
      :options="editorOption"
      content-type="html"
    />
  </v-card>
</template>

<style scoped>
:deep(.ql-container.ql-snow) {
  height: calc(100vh - 2.8rem - 48px);
  font-size: 16px;
}
:deep(.ql-editor) {
  overflow-y: scroll;
}
</style>
