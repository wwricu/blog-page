<script setup lang="ts">
const props = defineProps({
  activator: String,
  menu: Boolean,
  title: String,
  appendIcon: String,
  prependIcon: String
})
</script>

<template>
  <v-hover close-delay="200">
    <template v-slot:default="{ isHovering, props }">
      <v-btn
        :id="activator"
        v-bind="props"
        rounded="pill"
        class="ma-1"
        :color="isHovering || menu ? 'white' : 'primary'"
        :class="isHovering || menu ? 'bg-primary' : 'bg-white'"
        :append-icon="appendIcon"
        :prepend-icon="prependIcon"
      >
        {{ title }}
      </v-btn>
    </template>
  </v-hover>
</template>

<style scoped>

</style>