<script setup>
import {computed, ref} from 'vue';
import {useRouter} from "vue-router";

import {appId, apiKey, indexName} from "@/apis/algolia";
import {AisInstantSearch, AisSearchBox, AisHits} from 'vue-instantsearch/vue3/es';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';


const searchClient = ref(algoliasearch(appId, apiKey))
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  },
  width: {
    type: Number,
    default: 800,
    required: false
  },
  height: {
    type: Number,
    default: 600,
    required: false
  }
})

const emits = defineEmits(['update:modelValue'])
const dialogSwitch = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
    return val
  }
})

const showResult = ref(false)
const router = useRouter()
const searchFunction = (helper) => {
  showResult.value = !!helper.state.query
  helper.search()
}
</script>

<template>
  <v-dialog
    v-model="dialogSwitch"
    :max-width="props.width"
  >
    <v-card
      class="bg-blue-grey-lighten-5"
      :height="props.height"
    >
      <ais-instant-search
        :search-client="searchClient"
        :index-name="indexName"
        :stalled-search-delay="1000"
        :search-function="searchFunction"
      >
        <ais-search-box autofocus/>
        <ais-hits v-show="showResult">
          <template v-slot:item="{ item }">
            <v-row
              no-gutters
              style="cursor: pointer;"
              @click="router.push(`/content/${item.objectID}`)"
            >
              <v-col cols="5">
                <h3>{{ item.title }}</h3>
              </v-col>
              <v-col
                cols="5"
                class="d-flex align-center justify-end"
              >
                <v-chip
                  density="compact"
                  variant="outlined"
                  color="primary"
                  class="mx-1"
                  v-for="tag in item.tags"
                  :key="tag"
                >
                  {{ tag }}
                </v-chip>
              </v-col>
              <v-col
                cols="2"
                class="d-flex align-center pl-2"
              >
                <v-icon color="primary">mdi-pound</v-icon>
                <h5>{{ item.category }}</h5>
              </v-col>
            </v-row>
          </template>
        </ais-hits>
      </ais-instant-search>
      <div class="mx-auto" v-show="!showResult">
        <v-sheet :height="height / 5" class="bg-transparent"/>
        <div class="d-flex justify-center">
          <v-icon
            :size="height / 3"
            color="grey-darken-1"
          >
            mdi-text-box-search-outline
          </v-icon>
        </div>
        <p
          class="text-body-1 text-grey-darken-1 mx-auto my-4"
        >
          Your search results will appear here
        </p>
      </div>
    </v-card>
  </v-dialog>
</template>
