<script setup lang="ts">
import axios from 'axios';
import { groupBy } from 'lodash';
import { NCard } from 'naive-ui';
import { onMounted } from 'vue';
import bCarousel from '@/components/elements/b-carousel.vue';
import BCarousel from "../../components/elements/b-carousel.vue";

const index = (await axios.get('/media/index.txt'))?.data?.replaceAll('\r', '').replaceAll('public/media/', '') as string;
const lines = index.split('\n').filter((l) => l);
interface slider {
  prio?: number,
  title: string,
  images: string[]
}
const slidersRaw = groupBy(lines, (line) => {
  const path = line.split('/');
  return path.splice(0, path.length - 1).join('/');
});
const sliders = Object.keys(slidersRaw).map((k) => ({
  prio: parseInt(k?.charAt(0)) || 0,
  title: k.replaceAll('/', ' ').slice(2),
  images: slidersRaw[k].map((s) => '/media/' + s)
} as slider))
sliders?.sort((a, b) => (a?.prio ?? 0) - (b?.prio ?? 0))
const emit = defineEmits(['ready'])
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'media');
})
</script>

<template>
  <div class="media" ref="pageRef">
    <div class="carousels">
      <div class="card"
        v-for="(slider, index) in sliders"
        :key="index"
      >
        <n-card>
          <template #header>
            <div class="header">
              <h1>{{ slider.title }}</h1>
            </div>
          </template>
            <b-carousel
              :images="slider.images"
            />
        </n-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

@media only screen and (min-width: 600px) {
  .card {
    width: 90%;
  }
}
@media only screen and (max-width: 600px) {
  .card {
    width: 100%;
    margin: 0;
  }

  .card :deep() .n-card__content {
    padding: 0 0 2em 0;
  }
}

.media {
  padding: 2em 0 2em 0;
  width: 100%;
}

.carousels {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  max-width: 100vw;
}

.card {
  max-width: 1920px;
  transition: all .2s ease;
}

.header h1 {
  text-align: center;
}

</style>