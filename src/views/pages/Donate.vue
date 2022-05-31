<script setup lang="ts">import { nextTick, onMounted, onUpdated } from 'vue';

const newTab = (url: string) => {
  window.open(url, '_blank')?.focus();
}
const emit = defineEmits(['ready']);
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'donate');
})
</script>

<template>
  <div class="donate">
    <p>If you'd like to help keep the lights on,</p>
    <p>check out our Tebex Webstore!</p>
    <div class="tebex"
      @click="newTab('https://rustfactions.tebex.io/')"
    >
      <img src="../../assets/tebex.svg">
    </div>
    <p>This server is run by volunteers who invest their time and money</p>
    <p>to give you the ultimate Rust Roleplay experience</p>
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

.donate p {
  font-size: xx-large;
  font-weight: 700;
}

.tebex {
  width: 100%;
  padding: 2.5em;
  background-color: #09264e;
  box-shadow: 0px 0px 25px 5px #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 1em;
}

.tebex img {
  transform: scale(2);
}
</style>