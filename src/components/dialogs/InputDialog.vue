<script setup lang="ts">
import {computed, ref} from "vue";

const dialogSwitch = ref(false)
defineExpose({
  switchDialog() {
    dialogSwitch.value = !dialogSwitch.value
  }
})

const props = defineProps({
  modelValue: {
    type: String,
    default: 'test'
  },
  label: String,
  title: String,
  confirmHandle: Function,
  cancelHandle: Function,
})

const confirm = () => {
  if (props.confirmHandle !== undefined) {
    props.confirmHandle()
  }
  dialogSwitch.value = false
}
const cancel = () => {
  if (props.cancelHandle !== undefined) {
    props.cancelHandle()
  }
  dialogSwitch.value = false
}

const emits = defineEmits(['update:modelValue'])
const inputText = computed({
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
    width="400"
  >
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-text-field
        class="mx-4 mt-2"
        :label="label"
        variant="underlined"
        color="primary"
        v-model="inputText"
      />
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="error"
          @click="cancel()"
        >
          cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="confirm()"
        >
          confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
