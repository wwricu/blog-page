<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps({
  modelValue: Boolean,
  activator: String
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

const subFolders = ref([
  {
    text: 'C++',
    link: '/C++'
  },
  {
    text: 'Java',
    link: '/Java'
  }
])
const push = (text: String) => {
  alert(text)
}

</script>

<template>
  <v-menu
    open-on-hover
    :activator="activator"
    transition="scroll-y-transition"
    v-model="menuOutput"
  >
    <v-list>
      <v-list-item
          v-for="subFolder in subFolders"
          :key="subFolder"
          link
      >
        <v-list-item-title
            @click="push(subFolder.text)"
        >
          {{subFolder.text}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>