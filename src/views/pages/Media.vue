<script setup lang="ts">
import groupBy from 'lodash.groupby';
import bCarousel from '@/components/elements/b-carousel.vue';
import bCard from '@/components/elements/b-card.vue';
import { ref, type Ref } from 'vue';

const index = (await (await fetch('/media/index.txt')).text())?.replaceAll('\r', '').replaceAll('public/media/', '') as string;
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
const indices: Ref<number>[] = [];
sliders.map(() => indices.push(ref(0)))
</script>

<template>
  <div class="media" ref="pageRef">
    <b-card
      class="card"
    >
      <iframe
        src="https://www.youtube.com/embed/kkRkaxFFTeI" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </b-card>
    <div class="carousels">
      <b-card
      class="card"
      v-for="(slider, index) in sliders"
      :key="index"
      >
        <template #header>
          <div class="header">
            <h1>{{ slider.title }}</h1>
          </div>
        </template>
        <b-carousel
          :images="slider.images"
          :transitionDuration="200"
          gap="30px"
          maxHeightDesktop="500px"
          maxHeightMobile="300px"
          :velocityThreshold=".2"
        />
      </b-card>
    </div>
  </div>
</template>

<style scoped>

.media {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
}

.card {
  padding: 0;
  margin: 0;
}

.card iframe {
  width: 100%;
  aspect-ratio: 16/9;
}

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