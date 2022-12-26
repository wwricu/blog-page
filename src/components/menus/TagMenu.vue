<script setup lang="ts">
import {computed, PropType, ref} from "vue";
import {useRouter} from "vue-router";
import type {Tag} from "@/types/schemas/tag";

const props = defineProps({
  modelValue: Boolean,
  activator: String,
  tags: {
    type: Object as PropType<Tag>
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

const chooseTag = (tag: Tag) => {
  if (tag.name !== undefined) {
    emits('select', tag.name)
    router.push(`/tag/${encodeURIComponent(tag.name)}`)
  }
}
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
    <v-item-group
      column
      color="white"
    >
      <v-chip
        filter
        variant="outlined"
        color="primary"
        class="ma-1"
        v-for="tag in tags"
        :key="tag.id"
        @click="chooseTag(tag)"
      >
        {{ tag.name }}
      </v-chip>
    </v-item-group>
  </v-overlay>
</template>
