<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import emojis from 'markdown-it-emoji';
import icons from 'markdown-it-icons';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import taskLists from 'markdown-it-task-lists';
const plugins = [emojis, icons, subscript, superscript, taskLists].map((plugin) => ({plugin}));

interface Props {
  markdown: string
}
const props = defineProps<Props>()

</script>

<template>
  <div class="markdown">
    <Markdown 
      :source="props.markdown" 
      :plugins="plugins" 
      html
    />
  </div>
</template>

<style scoped>

.markdown :deep() p {
  font-size: x-large;
  font-weight: 700;
}

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