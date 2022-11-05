<script setup lang="ts">

import {ref} from "vue";

const content = ref("")
const quillEditor = ref()
function printContent() {
  console.log(quillEditor.value.getContents())
}

</script>
<template>
  <v-card
    max-width="800px"
  >
    <v-container class="mt-n2 mb-n6">
      <v-row>
        <v-col cols="8">
          <v-text-field
            density="compact"
            variant="underlined"
            color="indigo"
            label="Title"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="align-self-end">
          <v-select
            density="compact"
            variant="underlined"
            color="indigo"
            label="Category"
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