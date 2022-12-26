<script setup lang="ts">
import {computed} from "vue";
import {useRouter} from "vue-router";
import type {Tag} from '@/types/schemas/tag'

const props = defineProps({
  modelValue: Boolean,
  activator: String,
  list: {
    type: Object
  }
})

const emits = defineEmits(['update:modelValue', 'select'])
const menuOutput = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const router = useRouter()
const selectTag = (category: Tag) => {
  if (category.name !== undefined) {
    emits('select', category.name)
    router.push(`/category/${encodeURIComponent(category.name)}`)
  }
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
        v-for="category in list"
        :key="category.id"
        link
      >
        <v-list-item-title
          @click="selectTag(category)"
        >
          {{category.name}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
