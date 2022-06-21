<script setup lang="ts">
import { NButton } from 'naive-ui';
const link = 'https://discord.gg/GuqnkhV';
const newTab = (url: string) => {
  window.open(url, '_blank')?.focus();
}
</script>

<template>
  <div class="contact">
    <n-button
      class="button"
      @click="newTab(link)"
      size="large"
      type="primary"
      color="#4752c4"
    >
      Join us on Discord
    </n-button>
    <iframe 
      title="Discord embed"
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
  gap: 2rem;
  padding-bottom: 2em;
}

.button {
  padding: 2em;
}

.button :deep() .n-button__content {
  font-size: xx-large;
  font-weight: 700;
  color: var(--text)
}
</style>