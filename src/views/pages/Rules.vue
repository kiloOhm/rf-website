<script setup lang="ts">
import { NIcon, NLayout, NLayoutSider, NMenu, type MenuOption, NCard } from 'naive-ui';
import { ref, type Component, h, nextTick, onUpdated, onMounted } from 'vue';
import { BookmarkOutline } from '@vicons/ionicons5';
import axios from 'axios';
import { parseList } from '@/util/parseList';

let doc: string = (await axios.get('https://docs.google.com/document/d/e/2PACX-1vT9CpS4HYU5FwRHzJ2aHIhYJC8CQUxN2FMkWAOFmT3uKUag3SE7bHyAwhMNxGlEKyiclVVpZ-Bs0q7C/pub')).data;
doc = doc.slice(doc.indexOf('<div class'), doc.indexOf('<script'));
doc = doc.replace('-0 start', '-0');
// const lines = ((await axios.get('/Rules.md')).data as string).split('\n');
// const parsed = parseList(lines);

const activeKey = ref();
const collapsed = ref(false);
const emit = defineEmits(['ready'])
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'rules');
})
</script>

<template>
  <div class="rules">
    <div class="card">
      <n-card>
        <div class="content">
          <div
            class="doc"
            v-html="doc"
          ></div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.rules {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
}

.card {
  max-width: 1920px;
  width: 90vw;
}

.card :deep() .n-card__content {
  padding: 1em;
}

.content {
  height: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--bg3);
  border-radius: 5px;
}

.content .doc {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content :deep() .title {
  text-align: center;
  font-size: xx-large;
  font-weight: 700;
}
.content :deep() .subtitle {
  text-align: center;
  font-size: large;
  font-weight: 700;
}

.content :deep() .start li {
  margin-left: 1em;
}


.content :deep() ol li span {
  font-weight: 700;
  font-size: large;
}

.content :deep() ol.start li span {
  font-weight: 400;
  font-size: medium;
}


</style>