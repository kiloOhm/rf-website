<script setup lang="ts">
import axios from 'axios';
import { groupBy } from 'lodash';
import { NCarousel, NCard, NCarouselItem, NIcon, NModal } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { PauseOutline } from '@vicons/ionicons5';

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
const emit = defineEmits(['ready'])
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'media');
})
const fullScreen = ref<string | undefined>();
</script>

<template>
  <div class="media" ref="pageRef">
    <div class="carousels">
      <div class="card desktop"
        v-for="(slider, index) in sliders"
        :key="index"
        :class="(hovered == slider.title ? 'hovered' : '')"
      >
        <transition>
          <div 
            class="header-extra"
            v-if="hovered == slider.title"
          >
            <n-icon 
              size="30"
              @touchstart="hovered = null"
            >
              <pause-outline/>
            </n-icon>
          </div>
        </transition>
        <n-card
          @mouseenter="hovered = slider.title"
          @mouseleave="hovered = null"
          @touchstart="hovered = slider.title"
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
                loading="lazy"
                @click="fullScreen = url"
              >
            </n-carousel-item>
          </n-carousel>
        </n-card>
      </div>
      <div class="card mobile"
        v-for="(slider, index) in sliders"
        :key="index"
        :class="(hovered == slider.title ? 'hovered' : '')"
      >
        <transition>
          <div 
            class="header-extra"
            v-if="hovered == slider.title"
          >
            <n-icon 
              size="30"
              @touchstart="hovered = null"
            >
              <pause-outline/>
            </n-icon>
          </div>
        </transition>
        <n-card
          @mouseenter="hovered = slider.title"
          @mouseleave="hovered = null"
          @touchstart="hovered = slider.title"
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
                loading="lazy"
                @click="fullScreen = url"
              >
            </n-carousel-item>
          </n-carousel>
        </n-card>
      </div>
    </div>
    <n-modal
      :show="fullScreen != undefined"
      @update:show="(v) => !v ? fullScreen = undefined : null"
      
    >
      <div id="fullscreen">
        <img :src="fullScreen"/>
      </div>
    </n-modal>
  </div>
</template>

<style scoped>

@media only screen and (min-width: 600px) {
  .mobile {
    display: none;
  }
}
@media only screen and (max-width: 600px) {
  .desktop {
    display: none;
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
  width: 90%;
  max-width: 1920px;
  transition: all .2s ease;
}

.card.mobile {
  width: 100%;
}

.card.mobile :deep() .n-card__content {
  padding: 0;
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

#fullscreen {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#fullscreen img {
  object-fit: contain;
  max-width: 90%;
  max-height: 90%;
}
</style>