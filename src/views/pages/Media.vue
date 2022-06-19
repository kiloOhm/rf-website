<script setup lang="ts">
import axios from 'axios';
import { groupBy } from 'lodash';
import { NCard, NIcon, NModal } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { PauseOutline } from '@vicons/ionicons5';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Lazy, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
            <swiper
              :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }"
              :lazy="true"
              :pagination="{
                clickable: true,
              }"
              :centeredSlides="true"
              slides-per-group-auto
              :modules="[ Lazy, Pagination, Autoplay ]"
              class="swiper"
              ref="carouselRefs"
              :loop="true"
            >
              <swiper-slide
                v-for="(url, index2) in slider.images"
                :key="index2"
              >
                <img
                  :data-src="url"
                  :alt="url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))"
                  class="swiper-lazy"
                  @click="fullScreen = url"
                />
                <div
                  class="swiper-lazy-preloader swiper-lazy-preloader-white"
                ></div> 
              </swiper-slide>
            </swiper>
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
    padding: 0;
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
  width: 90%;
  height: 90%;
  margin: auto;
}

#fullscreen img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin: auto;
}

.swiper-slide img {
  display: block;
  max-width: 100%;
  max-height: 500px;
  object-fit: cover;
  color: transparent;
}

</style>