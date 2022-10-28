<script setup lang="ts">
import EditorCard from "@/components/cards/EditorCard.vue";

const buttons = [
  {
    icon: 'mdi-cloud-upload',
    color: 'indigo',
    handle: () => {
    }
  },
  {
    icon: 'mdi-content-save',
    color: 'success',
    handle: () => {
    }
  },
  {
    icon: 'mdi-delete',
    color: 'error',
    handle: () => {
    }
  },
]
</script>

<template>
  <editor-card class="mx-auto"/>
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
  bottom: 0px;
  right: 0px;
}
</style>