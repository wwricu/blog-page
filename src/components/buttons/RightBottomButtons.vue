<script setup lang="ts">

const props = defineProps({
  buttons: {
    required: true
  }
})

</script>

<template>
  <v-container id="icons">
    <v-row class="flex-column" no-gutters>
      <v-col
        class="mt-2"
        v-for="button in buttons"
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
#icons {
  position: fixed;
  width: auto;
  bottom: 0;
  right: 0;
}
</style>