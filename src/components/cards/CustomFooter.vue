<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  textColor: {
    type: String,
    required: false,
    default: 'text-grey-lighten-2'
  }
})

const links = ref([
  {
    text: 'Login',
    link: '/login',
  },
  {
    text: 'Contact me',
    link: 'mailto:iswangwr@outlook.com',
  },
  {
    text: 'Manage',
    link: '/manage',
  },
])
const skipTo = (link: string) => {
  window.open(link,"_self")

}
</script>

<template>
  <v-footer class="bg-transparent">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        variant="text"
        class="mx-2"
        :class="props.textColor"
        rounded="xl"
        @click="skipTo(link.link)"
      >
        {{ link.text }}
      </v-btn>
      <v-col
        class="text-center mt-4"
        :class="props.textColor"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>WWR</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
