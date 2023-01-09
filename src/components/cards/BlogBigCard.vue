<script setup lang="ts">
import type {PropType} from "vue";
import type {ContentOutput} from'@/types/schemas/resource'
import {computed} from "vue";
import {useDisplay} from 'vuetify'
import {useRouter} from "vue-router";


const props = defineProps({
  coverIndex: {
    type: [Number, String],
    required: false,
    default: 1
  },
  blog: {
    type: Object as PropType<ContentOutput>,
    required: true
  }
})

const { name } = useDisplay()
const cardWidth = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm': return 'w-auto'
  }
  return 800
})

const emits = defineEmits(['select'])
const router = useRouter()
const selectTag = (filter: string, name: string) => {
  if (name != null) {
    emits('select', name)
    router.push(`/${filter}/${encodeURIComponent(name)}`)
  }
}

const getImgUrl = () => {
  return new URL(`../../assets/card_covers/${props.coverIndex}.jpg`,
      import.meta.url).href;
}
</script>

<template>
  <v-card
    min-height="200"
    color="rgba(250, 251, 241, 0.8)"
    :width="cardWidth"
    rounded="lg"
  >
    <v-row>
      <v-col xs="12" sm="8" style="opacity: 0.75">
        <v-hover>
          <template v-slot="{ isHovering, props }">
            <v-card-title
              v-bind="props"
              class="text-h4 my-4"
              :class="isHovering ? 'text-indigo-darken-4' : ''"
              style="cursor: pointer;"
            >
              {{blog.title}}
            </v-card-title>
          </template>
        </v-hover>
        <p
          class="d-flex text-body-1 ml-4 mt-4"
        >
          <v-icon color="primary">mdi-pound</v-icon>
          <v-hover>
            <template v-slot="{ isHovering, props }">
              <span
                v-bind="props"
                :class="isHovering ? 'text-indigo-darken-4' : ''"
                class="ml-1"
                style="cursor: pointer"
                @click.stop="selectTag('category', blog.category?.name)"
              >
                {{blog.category?.name}}
                <v-tooltip
                  activator="parent"
                  location="end"
                >
                  click to select {{blog.category?.name}}
                </v-tooltip>
              </span>
            </template>
          </v-hover>
        </p>
        <v-card-text class="d-flex text-body-1 text-sm-body-2">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
              class="text-grey-darken-2 my-2 my-sm-0"
            >
              <v-icon color="primary" class="mr-1">mdi-calendar-clock</v-icon>
              <span>Created At &ensp;{{blog.created_time.slice(0, 10)}}</span>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="text-grey-darken-2 text-sm-right my-2 my-sm-0"
            >
              <v-icon color="primary" class="mr-1">mdi-calendar-clock</v-icon>
              <span>Updated At &ensp;{{blog.updated_time.slice(0, 10)}}</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="ml-4"/>
        <v-card-actions class="ml-2 my-2">
          <v-icon color="primary">mdi-tag</v-icon>
          <v-chip
            color="primary"
            class="mx-1 post-tag"
            v-for="item in blog.tags"
            :key="item.id"
            @click.stop="selectTag('tag', item?.name)"
          >
            {{item?.name}}
            <v-tooltip
              activator="parent"
              location="end"
            >
              click to select {{item?.name}}
            </v-tooltip>
          </v-chip>
        </v-card-actions>
        <slot name="action"/>
      </v-col>
      <v-col class="d-none d-sm-flex" sm="4">
        <v-img
          cover
          :src="getImgUrl()"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.post-tag {
  cursor: pointer;
}
</style>
