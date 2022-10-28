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
    max-width="1000px"
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
  margin-top: -3rem;
  padding-top: 3rem;
  height: 100vh;
}
/deep/ .ql-editor {
  overflow-y: scroll;
}
</style>