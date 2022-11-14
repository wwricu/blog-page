<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getSubFolders} from "@/apis/folder";
import {Base64, encode} from "js-base64";
import {getContent} from "@/apis/content";
import {useRoute} from "vue-router";

const quillEditor = ref()
const content = ref("")

onMounted(()=> {
  findContent()
  getSubFolders((res: any)=>{
    categories.value = res.data
  }, (res: any)=>{
    console.log(res)
  })
})

defineProps({
  id: {
    type: Number,
    required: true
  }
})

const title = ref()
const categories = ref()
const categorySelect = ref()

const route = useRoute()
function findContent() {
  getContent({
    id: route.params.id
  }, (res: any)=>{
    title.value = res.data[0].title
    categorySelect.value.id = res.data[0].parent_id
    quillEditor.value.setContents(Base64.decode(res.data[0].content))
    // get category
  }, ()=>{})
}

defineExpose({
  getEditorContents() {
    return {
      id: route.params.id,
      title: title.value,
      author_id: 1,
      parent_id: categorySelect.value.id,
      content: encode(quillEditor.value.getContents())
    }
  }
})

function printContent() {
  // console.log(quillEditor.value.getContents())
  // quillEditor.value.setContents('<p>???</p>')
  alert(categories)
}

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
          ></v-select>
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