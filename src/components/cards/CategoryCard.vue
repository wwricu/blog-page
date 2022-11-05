<script setup lang="ts">
import {getCurrentInstance} from "vue";
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
  })
}
</script>

<template>
  <v-card>
    <v-card-title>{{folder.title}}</v-card-title>
    <v-card-text class="d-flex">
        <p class="text-grey-darken-2">Created Time: &ensp;</p>
        <p>{{folder.createdTime}}</p>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="renameFolder()"
      >
        rename
      </v-btn>
      <v-btn
        color="error"
        @click="deleteFolder"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
