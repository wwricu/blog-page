<script setup lang="ts">
import {computed} from "vue";


const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  trueIcon: {
    type: String,
    required: false,
    default: 'mdi-undo'
  },
  falseIcon: {
    type: String,
    required: false,
    default: 'mdi-redo'
  },
  trueColor: {
    type: String,
    required: false,
    default: 'primary'
  },
  falseColor: {
    type: String,
    required: false,
    default: 'secondary'
  }
})

const emits = defineEmits(['update:modelValue'])
const switchValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
    return val
  }
})
</script>

<template>
  <v-btn
    density="comfortable"
    :icon="switchValue ? trueIcon : falseIcon"
    :color="switchValue ? trueColor : falseColor"
  />
</template>
