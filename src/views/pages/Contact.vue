<script setup lang="ts">
import { nextTick, onMounted, onUpdated } from 'vue';

const emit = defineEmits(['ready'])
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'contact');
})
</script>

<template>
  <div class="contact">
    <iframe 
      src="https://discord.com/widget?id=381654214369345558&theme=dark" 
      width="350" 
      height="500" 
      allowtransparency="true" 
      frameborder="0" 
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    ></iframe>
  </div>
</template>

<style scoped>
.contact {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2em;
}
</style>