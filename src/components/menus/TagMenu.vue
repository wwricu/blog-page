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

let tagSelect = ref([])
</script>

<template>
  <v-overlay
    open-on-hover
    :activator="activator"
    class="align-center justify-center"
    transition="scroll-y-transition"
    v-model="menuOutput"
  >
    <v-chip-group
      v-model="tagSelect"
      column
      multiple
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
</template>

<style scoped>

</style>