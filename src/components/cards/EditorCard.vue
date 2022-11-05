<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getCategories} from "@/global/apis";
import {encode} from "js-base64";

const quillEditor = ref()
const content = ref("")

onMounted(()=> {
  getCategories((res: any)=>{
    categories.value = res.data.obj
  }, (res: any)=>{
    console.log(res)
  })
})

const title = ref()
const categories = ref()
const categorySelect = ref()

defineExpose({
  getEditorContents() {
    return {
      title: title.value,
      author: {
        id: 1
      },
      parent: {
        id: categorySelect.value.id
      },
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