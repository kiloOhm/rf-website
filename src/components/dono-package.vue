<script setup lang="ts">
import md from '@/components/render-markdown.vue';
import { toRefs } from 'vue';
import bCard from '@/components/elements/b-card.vue';

interface Props {
  title: string;
  image: string;
  text: string;
}
const props = defineProps<Props>();
const {title, image, text} = toRefs(props);
const newTab = (url: string) => {
  window.open(url, '_blank')?.focus();
}
</script>

<template>
  <div class="dono-package">
    <b-card
      class="card"
    >
      <template #header>
        <div class="text">
          <md
            :style="'font-size: large; font-weight: 400;'"
            :markdown="text"
          />
        </div>
        <div 
          class="h-background"
          :style="`background-image: url(${image});`"
        ></div>
        <h1 class="header">{{ title }}</h1>
      </template>
      <template #action>
        <div class="tebex"
          @click="newTab('https://rustfactions.tebex.io/')"
        >
          <p>view on </p>
          <img width="138.4" height="14.2" src="../assets/tebex.svg" alt="Tebex Webstore">
        </div>
      </template>
    </b-card>
  </div>
</template>

<style scoped>
.dono-package {
  width: clamp(450px, 450px, 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card :deep() .header {
  text-align: center;
  font-size: xxx-large;
  font-weight: 700;
  text-shadow: 1px 1px 1px #00000066;
  margin: 1rem;
  margin-bottom: 10rem;
}
.card :deep() .h-background {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  filter: brightness(75%);
}

.text {
  background-color: #00000066;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .2s ease-in-out;
  backdrop-filter: blur(5px);
}

.text :deep() li {
  font-size: 1.2rem;
  font-weight: 700;
}

.text:hover {
  opacity: 1;
}

.card :deep() .b-card__action {
  padding: 0 1rem 0 1rem;
  background-color: #09264e;
  font-size: x-large;
}

.tebex {
  width: 100%;
  padding: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}
</style>