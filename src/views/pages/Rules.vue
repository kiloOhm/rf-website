<script setup lang="ts">
import { NIcon, NLayout, NLayoutSider, NMenu, type MenuOption, NCard } from 'naive-ui';
import { ref, type Component, h, nextTick, onUpdated, onMounted } from 'vue';
import { BookmarkOutline } from '@vicons/ionicons5';
import axios from 'axios';
import { parseList } from '@/util/parseList';

const lines = ((await axios.get('/Rules.md')).data as string).split('\n');
const parsed = parseList(lines);

const activeKey = ref();
const collapsed = ref(false);
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = parsed?.map((o) => {
  o.label = o.text;
  o.icon = renderIcon(BookmarkOutline);
  return o;
})
const emit = defineEmits(['ready'])
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'rules');
})
const text = menuOptions.map((mo) => ({
  key: mo.key,
  html: h('p', mo.text)
}))
</script>

<template>
  <div class="rules">
    <div class="card">
      <n-card>
        <n-layout has-sider>
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
          >
            <n-menu
              v-model:value="activeKey"
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
            />
          </n-layout-sider>
          <n-layout>
            <!-- <div class="content">
              <div 
                class="line"
                v-for="(line, index) in lines"
                :key="index"
              >
                <p>{{ line }}</p>
              </div>
            </div> -->
          </n-layout>
        </n-layout>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.rules {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  width: 90%;
  max-width: 1920px;
  height: 814px;
}

.content {
  max-height: 774px;
  overflow: auto;
}
</style>