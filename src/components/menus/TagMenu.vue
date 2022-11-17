<script setup lang="ts">
import {computed, PropType, ref} from "vue";

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
</script>

<template>
  <v-overlay
    open-on-hover
    :activator="activator"
    transition="scroll-y-transition"
    v-model="menuOutput"
  />
</template>

<style scoped>

</style>