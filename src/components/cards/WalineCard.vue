<script setup>
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import '@waline/client/dist/waline.css';


const serverURL = 'https://thisiswwr.com/waline';
const path = computed(() => useRoute().path);
</script>

<template>
  <Waline
    :serverURL="serverURL"
    :path="path"
    login="disable"
    :page-size="5"
    :image-uploader="false"
    :copyright="false"
    :search="false"
    word-limit="140"
  />
</template>
