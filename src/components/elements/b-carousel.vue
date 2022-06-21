<script setup lang="ts">
import { toRefs, ref } from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: string[];
}
const props = defineProps<Props>();
const { images } = toRefs(props);

let i = 0;
const interval = setInterval(() => {
  if(i >= images.value.length) {
    clearTimeout(interval);
    return;
  }
  const image = images.value[i];
  axios.get(image, {
    responseType: 'blob'
  }).then(response => {
    loadedImages.value.push(URL.createObjectURL(response.data));
  });
  i++;
}, 50);

const loadedImages = ref<string[]>([]);

</script>

<template>
  <div class="b-carousel">
    <swiper
      :space-between="30"
      :pagination="{
        dynamicBullets: true,
        clickable: true,
      }"
      :modules="[ Pagination ]"
      class="mySwiper"
    >
      <swiper-slide
        class="slide"
        v-for="(image, index) in loadedImages"
        :key="index"
      >
        <img 
          :src="image"
          :alt="images[index]"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>

.b-carousel {
  width: 100%;
  height: 500px;
}

@media only screen and (max-width: 600px) {
  .b-carousel {
    height: 300px;
  }
  .slide img {
    height: 300px;
  }
}

.slide {
  display: grid;
  place-items: center;
}

.slide img {
  width: 100%;
  height: 500px;
  object-fit: contain;
}

.b-carousel :deep() .swiper-pagination-bullet-active-main {
  background: #fff !important;
  opacity: .8 !important;
}
.b-carousel :deep() .swiper-pagination-bullet {
  background: #fff !important;
  opacity: .5 !important;
}

.b-carousel :deep() .swiper-wrapper {
  align-items: center;
}

</style>