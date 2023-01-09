<script setup lang="ts">
import {computed, ref} from "vue";


const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  label: String,
  title: String,
})

const emits = defineEmits([
  'update:modelValue',
  'confirm',
  'cancel'
])

const inputText = ref('')
const inputDialog = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
    return val
  }
})

const confirm = () => {
  emits('confirm', inputText.value)
  inputText.value = ''
}
const cancel = () => {
  emits('cancel', inputText.value)
  inputText.value = ''
  inputDialog.value = false
}
</script>

<template>
  <v-dialog
    v-model="inputDialog"
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
