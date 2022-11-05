<script setup lang="ts">
import {ref, getCurrentInstance} from "vue";
const ctx = getCurrentInstance()!.appContext.config.globalProperties

const props = defineProps({
  folder: {
    required: true
  }
})

function renameFolder() {
  alert('not implemented!')
}
function deleteFolder() {
  ctx.$http.request({
    method: 'DELETE',
    url: 'http://localhost:8443/resource',
    data: props.folder
  }).then((res: any) => {
    if (res.data.status === 'success') {
      alert('success')
    }
  })
}
</script>

<template>
  <v-card>
    <v-card-title>{{folder.title}}</v-card-title>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="renameFolder()"
      >
        rename
      </v-btn>
      <v-btn
        color="primary"
        @click="deleteFolder"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
