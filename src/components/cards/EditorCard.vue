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
    class="mt-12"
  >
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