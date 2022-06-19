<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import donoPackage from '@/components/dono-package.vue';

const packagesMD = (await axios.get('/DonationPackages.md')).data as string;
interface packageInfo {
  title: string;
  image: string;
  text: string;
}
const packages = packagesMD.split('#').filter((p) => p).map((p) => {
  const lines = p.split('\n');
  return {
    title: lines.shift(),
    image: lines.shift()?.match(/(?<=\().*(?=\))/)?.[0] ?? '',
    text: lines.join('\n'),
  } as packageInfo
});

const emit = defineEmits(['ready']);
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'donate');
})
</script>

<template>
  <div class="donate">
    <p>This server is run by volunteers who invest their own time and money to give you the ultimate Rust Roleplay experience.</p>
    <div class="packages">
      <dono-package
        v-for="(p, index) in packages"
        :key="index"
        :title="p.title"
        :image="p.image"
        :text="p.text"
      />
    </div>
    <p>Thanks for all your support!</p>
  </div>
</template>

<style scoped>
.donate {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em 0 2em 0;
}

.packages {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  max-width: 90%;
  gap: 1em;
  margin: 2rem 0 2rem 0;
}

.donate p {
  width: 90%;
  max-width: 64ch;
  font-size: xx-large;
  font-weight: 700;
  text-align: center;
}
</style>