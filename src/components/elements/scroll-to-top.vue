<script setup lang="ts">
import { throttle } from 'lodash';
import { ref, nextTick, computed, Transition } from 'vue';
import { NIcon } from 'naive-ui';
import { ArrowUpOutline } from '@vicons/ionicons5';

interface Props {
  target: string;
}
const props = defineProps<Props>()

const scrollTopAmount = ref(0);
const scrollContainer = () => document.getElementById(props.target);
const setScrollTopAmount = throttle((amount) => {
  scrollTopAmount.value = amount;
}, 200);
nextTick(() => {
  scrollContainer()?.addEventListener('scroll', function(e) {
    setScrollTopAmount(this.scrollTop);
  })
})
const showScrollToTop = computed(() => {
  return scrollTopAmount.value > 50;
})
const doScrollToTop = () => {
  scrollContainer()?.scrollTo({
    top: 0, 
    behavior: 'smooth'
  });
}
</script>

<template>
  <Transition>
    <div 
      v-if="showScrollToTop" 
      class="scroll-to-top"
      @click="doScrollToTop"
    >
      <n-icon size="30px">
        <arrow-up-outline/>
      </n-icon>
    </div>
  </Transition>
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
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>