<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  modelValue: Boolean,
  activator: String,
  list: {
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
  <v-menu
    open-on-hover
    :activator="activator"
    transition="scroll-y-transition"
    v-model="menuOutput"
  >
    <v-list>
      <v-list-item
        v-for="subFolder in list"
        :key="subFolder"
        link
      >
        <v-list-item-title
          @click="$router.push(`/category/${subFolder.id}`)"
        >
          {{subFolder.title}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
