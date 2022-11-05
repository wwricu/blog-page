<script setup lang="ts">
import {getCurrentInstance} from "vue";
const ctx = getCurrentInstance()!.appContext.config.globalProperties

const props = defineProps({
  category: {
    required: true
  }
})

function renameCategory() {
  alert('not implemented!')
}
function deleteCategory() {
  ctx.$http.request({
    method: 'DELETE',
    url: 'http://localhost:8443/resource',
    data: props.category
  })
}
</script>

<template>
  <v-card>
    <v-card-title>{{category.title}}</v-card-title>
    <v-card-text class="d-flex">
        <p class="text-grey-darken-2">Created Time: &ensp;</p>
        <p>{{category.createdTime}}</p>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="renameCategory()"
      >
        rename
      </v-btn>
      <v-btn
        color="error"
        @click="deleteCategory"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
