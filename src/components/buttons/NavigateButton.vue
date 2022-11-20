<script setup lang="ts">
const localProps = defineProps({
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
        :id="localProps.activator"
        v-bind="props"
        rounded="pill"
        class="ma-1"
        :color="isHovering || menu ? 'blue-grey-lighten-5' : 'primary'"
        :class="isHovering || menu ? 'bg-primary' : 'bg-blue-grey-lighten-5'"
        :append-icon="localProps.appendIcon"
        :prepend-icon="localProps.prependIcon"
      >
        {{ title }}
      </v-btn>
    </template>
  </v-hover>
</template>

<style scoped>

</style>