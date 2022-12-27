<script setup lang="ts">
const localProps = defineProps({
  activator: String,
  menu: Boolean,
  title: String,
  appendIcon: String,
  prependIcon: String
})
const emit = defineEmits(['click'])
</script>

<template>
  <v-hover close-delay="200">
    <template v-slot="{ isHovering, props }">
      <v-btn
        :id="localProps.activator"
        v-bind="props"
        rounded="pill"
        class="ma-1"
        :color="isHovering || menu ? 'blue-grey-lighten-5' : 'primary'"
        :class="isHovering || menu ? 'bg-primary' : 'bg-blue-grey-lighten-5'"
        :append-icon="localProps.appendIcon"
        :prepend-icon="localProps.prependIcon"
        @click="emit('click')"
      >
        {{ title }}
      </v-btn>
    </template>
  </v-hover>
</template>
