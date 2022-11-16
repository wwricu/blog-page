<script setup lang="ts">
const Title = 'Tags'

function push(link: String) {
  alert(link)
}
</script>

<template>
  <v-hover close-delay="200">
    <template v-slot:default="{ isHovering, props }">
      <v-btn
          id="menu-activator"
          v-bind="props"
          rounded="pill"
          class="ma-2 pa-n2"
          :color="isHovering || menu ? 'white' : 'primary'"
          :class="isHovering || menu ? 'bg-primary' : 'bg-white'"
          @click="push"
      >
        {{ Title }}
      </v-btn>
    </template>
  </v-hover>
</template>

<style scoped>

</style>