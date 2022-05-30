<script setup lang="ts">
import { computed, ref, toRefs, watch, type VNode } from 'vue';
import type { CSSProperties } from 'vue';

export interface navItem {
  title: string;
  header?: string;
  key: string;
  component?: VNode,
  onActivate?: (key: string) => void
}
interface Props {
  vertical?: boolean;
  items: navItem[];
  gap?: string;
  active: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:active']);
const { active } = toRefs(props);
const style = computed(() => ({
  flexDirection: props.vertical ? 'column' : 'row',
  columnGap: props.vertical ? '' : props.gap ?? '1em',
  rowGap: props.vertical ? props.gap ?? '1em' : '',
} as CSSProperties))
const select = (item: navItem) => {
  emit('update:active', item.key);
  item.onActivate?.(item.key);
}
</script>

<template>
  <div class="navMenu" :style="style">
    <div 
      class="item"
      :class="(active == item.key ? 'active' : '')"
      v-for="item in props.items"
      :key="item.key"
      @click="select(item)"
    >
    <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<style scoped>
.navMenu {
  display: flex;
}

.item {
  cursor: pointer;
}

.item p {
  margin: 0;
  padding: 0;
  font-size: xx-large;
  font-weight: 700;
  color: var(--text-dark);
  opacity: .6;
  transition: all .2s ease-in-out;
}

.item:hover p {
  opacity: .4;
}

.item.active p {
  color: var(--accent-dark);
  opacity: 1;
}
</style>