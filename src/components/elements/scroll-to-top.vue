<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { ArrowUpOutline } from '@vicons/ionicons5';

interface Props {
  target: string;
}
const props = defineProps<Props>()

const scrollContainer = () => document.getElementById(props.target);
const doScrollToTop = () => {
  scrollContainer()?.scrollTo({
    top: 0, 
    behavior: 'smooth'
  });
}
</script>

<template>
  <div 
    class="scroll-to-top"
    @click="doScrollToTop"
  >
    <n-icon size="30px">
      <arrow-up-outline/>
    </n-icon>
  </div>
</template>

<style scoped>

.scroll-to-top {
  position: absolute;
  bottom: 100px;
  right: 40px;
  width: 50px;
  height: 50px;
  background-color: var(--bg3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
}
</style>