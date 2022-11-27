<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  title: String,
})

const emits = defineEmits(['update:modelValue', 'confirm'])
const dialogSwitch = computed({
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
  <v-dialog
    v-model="dialogSwitch"
    width="200"
  >
    <v-card>
      <v-btn
        :color="color"
        @click="$emit('confirm')"
      >
        {{title}}
      </v-btn>
    </v-card>
  </v-dialog>
</template>
