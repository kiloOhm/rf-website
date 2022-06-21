<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import RenderMarkdown from '../../components/render-markdown.vue';
import { NCollapseTransition, NIcon } from 'naive-ui';
import { CaretDownOutline } from '@vicons/ionicons5';
const pluginsMD = (await axios.get('/Plugins.md')).data as string;
interface pluginInfo {
  title: string;
  image: string;
  text: string;
  collapsed?: boolean;
}
const plugins = pluginsMD.split('#').filter((p) => p).map((p) => {
  const lines = p.split('\n');
  return {
    title: '# ' + lines.shift(),
    image: lines.shift(),
    text: lines.join('\n'),
    collapsed: true,
  } as pluginInfo
});
const _plugins = reactive(plugins);
const direction = (i: number) => (i % 2) == 0 ? 'left' : 'right';
</script>

<template>
  <div class="plugins">
    <div 
      class="plugin"
      v-for="(plugin, index) in _plugins"
      :key="index"
    >
      <div 
        class="desktop"
        :class="direction(index)"
      >        
        <div class="title-section">
          <div class="title">
            <render-markdown 
              :markdown="plugin.title"
              :style="'font-size: large; font-weight: 700;'"
            />
          </div>
          <div class="image">
            <render-markdown 
              :markdown="plugin.image"
            />
          </div>
        </div>
        <div class="text">
          <render-markdown 
            :markdown="plugin.text"
            :style="'font-size: x-large; font-weight: 700;'"
          />
        </div>
      </div>
      <div class="mobile">        
        <div 
          class="title"
          @click="plugin.collapsed = !plugin.collapsed"
        >
          <n-icon 
            size="30"
            class="caret"
            :class="(plugin.collapsed ? '' : 'flipped')"
          >
            <caret-down-outline />
          </n-icon>
          <render-markdown 
            :markdown="plugin.title"
          />
        </div>
        <n-collapse-transition
          class="mobile"
          :show="!plugin.collapsed"
        >
          <div class="image">
            <render-markdown 
              :markdown="plugin.image"
            />
          </div>
          <div class="text">
            <render-markdown 
              :markdown="plugin.text"
            />
          </div>
        </n-collapse-transition>
      </div>
    </div>
  </div>
</template>

<style scoped>

.plugins {
  padding: 1em 6em 1em 6em;
  max-width: 1920px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 3em;
}

.desktop {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5em;
}

.mobile {
  width: 100%;
  display: flex;
  gap: 1em;
  flex-direction: column;
  align-items: center;
}

.mobile .title {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
  justify-items: center;
}

.mobile .title :deep() h1 {
  font-size: xx-large;
  padding: .4em;
}

.caret {
  transition: transform .3s ease-out;
}
.caret.flipped {
  transform: rotate(-180deg);
}

@media only screen and (max-width: 600px) {
  .plugins {
    padding: 1em 2em 1em 2em;
  }
  .desktop {
    display: none;
  }
  .plugins {
    gap: 1em;
  }
}
@media only screen and (min-width: 600px) {
  .mobile {
    display: none;
  }
}

.desktop.left {
  flex-direction: row;
}

.desktop.right {
  flex-direction: row-reverse;
}

.title-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5em;
}

.title {
  width: 100%;
  text-align: center;
  background-color: var(--blue-dark);
}

.title :deep() h1 {
  padding: .2em 0 .2em 0;
  font-size: 2.5em;
  line-height: 1.2;
}

.desktop .image :deep() img {
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
}

.mobile .image :deep() img {
  max-height: 20em;
}

.text {
  padding: 1em;
  background-color: var(--bg2);
  overflow-wrap: break-word;
  max-width: 120ch;
}

.plugin .markdown div {
  width: min-content;
} 

</style>