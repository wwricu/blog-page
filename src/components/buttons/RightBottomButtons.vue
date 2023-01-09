<script setup lang="ts">
const props = defineProps({
  buttons: {
    required: false
  }
})
</script>

<template>
  <v-container class="right-bottom-icons">
    <v-row class="flex-column" no-gutters>
      <v-col class="mt-2">
        <slot/>
      </v-col>
      <v-col
        class="mt-2"
        v-for="button in props.buttons"
        :key="button"
      >
        <v-btn
          density="comfortable"
          :icon="button.icon"
          :color="button.color"
          @click="button.handle"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.right-bottom-icons {
  position: fixed;
  width: auto;
  bottom: 0;
  right: 0;
  z-index: 100;
}
</style>
