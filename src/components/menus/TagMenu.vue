<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps({
  modelValue: Boolean,
  activator: String,
  tags: {
    type: Object
  }
})

const emits = defineEmits(['update:modelValue'])
const menuOutput = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const tagSelect = ref([])
const snackbar = ref()
</script>

<template>
  <v-overlay
    close-on-content-click
    scroll-strategy="none"
    :activator="activator"
    class="align-center justify-center"
    transition="scroll-y-transition"
    v-model="menuOutput"
    :opacity="0.1"
  >
    <v-chip-group
      column
      color="white"
      v-model="tagSelect"
      @click="snackbar = true"
    >
      <v-chip
        filter
        variant="outlined"
        color="primary"
        v-for="tag in tags"
        :key="tag.link"
      >
        {{ tag.text }}
      </v-chip>
    </v-chip-group>
  </v-overlay>
  <v-sheet v-show="snackbar" width="100">
    <v-snackbar
      color="indigo"
      timeout="3000"
      v-model="snackbar"
      class="text-center"
    >
      #{{ tags[tagSelect].text }} Selected
    </v-snackbar>
  </v-sheet>
</template>

<style scoped>

</style>