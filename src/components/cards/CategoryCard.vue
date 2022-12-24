<script setup lang="ts">
import {PropType} from "vue";
import type {Tag} from "@/types/schemas/tag";

const props = defineProps({
  category: {
    type: Object as PropType<Tag>,
    required: true
  }
})

const emit = defineEmits(['rename', 'delete']);
function renameCategory() {
  emit('rename', props.category)
}

function deleteCategory() {
  emit('delete', props.category)
  // deleteTagAPI(props.category.id as number, () => {
  //   alert('deleted')
  //   instance?.proxy?.$forceUpdate();
  // }, () => {})
}
</script>

<template>
  <v-card>
    <v-card-title>{{category.name}}</v-card-title>
    <v-divider/>
    <v-card-actions class="my-n2">
      <v-spacer/>
      <v-btn
        color="primary"
        @click="renameCategory()"
      >
        rename
      </v-btn>
      <v-btn
        color="error"
        @click="deleteCategory()"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
