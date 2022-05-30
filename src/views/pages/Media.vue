<script setup lang="ts">
import axios from 'axios';
import { groupBy } from 'lodash';
import { NCarousel, NCard, NCarouselItem, NIcon } from 'naive-ui';
import { ref } from 'vue';
import { PauseOutline } from '@vicons/ionicons5';

const index = (await axios.get('/media/index.txt'))?.data?.replaceAll('\r', '') as string;
const lines = index.split('\n').filter((l) => l).map((l) => l.slice(2, l.length));
interface slider {
  title: string,
  images: string[]
}
const slidersRaw = groupBy(lines, (line) => {
  const path = line.split('/');
  return path.splice(0, path.length - 1).join('/');
});
const sliders = Object.keys(slidersRaw).map((k) => ({
  title: k.replaceAll('/', ' '),
  images: slidersRaw[k].map((s) => '/media/' + s)
} as slider))
const carouselRefs = ref()
const randomInterval = (callback: () => void) => {
  var min = 2000,
    max = 5000;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  try {
    callback?.();
  // eslint-disable-next-line no-empty
  } catch {}
  setTimeout(() => randomInterval(callback), rand);
}
for(let i = 0; i < sliders.length; i++) {
  setTimeout(() => {
    randomInterval(() => {
      if(hovered.value == sliders[i].title) return;
      carouselRefs.value?.[i]?.next();
    })
  }, 2000)
}
const hovered = ref()
</script>

<template>
  <div class="media">
    <div class="carousels">
      <div 
        class="card"
        v-for="(slider, index) in sliders"
        :key="index"
        :class="(hovered == slider.title ? 'hovered' : '')"
      >
        <transition>
          <div 
            class="header-extra"
            v-if="hovered == slider.title"
          >
            <n-icon size="30">
              <pause-outline/>
            </n-icon>
          </div>
        </transition>
        <n-card
          @mouseenter="hovered = slider.title"
          @mouseleave="hovered = null"
          @touchstart="hovered = slider.title"
          @touchend="hovered = null"
        >
          <template #header>
            <div class="header">
              <h1>{{ slider.title }}</h1>
            </div>
          </template>
          <n-carousel
            class="carousel"
            dot-type="line"
            slides-per-view="auto"
            centered-slides
            draggable
            trigger="hover"
            ref="carouselRefs"
          >
            <n-carousel-item
              v-for="(url, index2) in slider.images"
              :key="index2"
              style="width: max-content; max-width: 100%; margin: auto;"
            >
              <img
                class="carousel-img"
                :class="(carouselRefs?.[index].getCurrentIndex() == index2 ? '' : 'outer')"
                :src="url"
              >
            </n-carousel-item>
          </n-carousel>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media {
  margin: 2em 0 2em 0;
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
  margin: 1em;
  width: 90%;
  max-width: 1920px;
  transition: all .2s ease;
}

.carousel-img {
  max-width: 100%;
  max-height: 50vh;
  object-fit: contain;
  transition: all .2s ease;
}

.card.hovered {
  box-shadow: 0px 0px 25px 0px #000000;
}

.outer {
  filter: brightness(.5);
  transform: scale(.9);
}

.header h1 {
  text-align: center;
}

.header-extra {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
}

.header-extra :deep() svg {
  fill: var(--text);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>