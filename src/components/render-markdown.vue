<script setup lang="ts">
import  { markdown } from '../util/markdown';

interface Props {
  markdown: string;
  style?: string;
}
const props = defineProps<Props>()
const html = await markdown(props.markdown);
</script>

<template>
  <div class="markdown">
    <div 
      v-html="html" 
      :style="props.style"
    ></div>
  </div>
</template>

<style scoped>

.markdown :deep() a {
  color: var(--text-dark);
  transition: color .2s ease;
}
.markdown :deep() a:hover {
  color: var(--accent-dark);
}

.markdown :deep() img {
  width: 100%;
  object-fit: contain;
}

</style>