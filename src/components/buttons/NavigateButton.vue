<script setup lang="ts">
const props = defineProps({
  menu: Boolean,
  title: String
})
</script>

<template>
  <v-hover close-delay="200">
    <template v-slot:default="{ isHovering, props }">
      <v-btn
        id="menu-activator"
        v-bind="props"
        rounded="pill"
        :color="isHovering || menu ? 'white' : 'primary'"
        :class="isHovering || menu ? 'bg-primary' : 'bg-white'"
      >
        {{ title }}
      </v-btn>
    </template>
  </v-hover>
</template>

<style scoped>

</style>