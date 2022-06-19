<script setup lang="ts">
import type { CSSProperties } from 'vue';
interface Props {
  color?: string,
  flip?: boolean
}
const props = defineProps<Props>();
const style = {
  backgroundColor: props.color,
  transform: props.flip ? 'rotate(180deg)' : '',
  maskPosition: `${Math.floor(Math.random() * window.innerWidth / 2)}px`
} as CSSProperties
</script>

<template>
  <div 
    class="divider"
    :style="style"
  ></div>
</template>

<style scoped>
.divider {
  height: 50px;
  mask-repeat: repeat-x;
  width: 100%;
  top: 0;
}

@media screen and (-webkit-min-device-pixel-ratio:0) { 
  .divider {
    -webkit-mask-image: url("/divider_mask.svg");
  }
}

@-moz-document url-prefix() {
  .divider {
    mask-image: url("/divider_mask.svg");
  }
}
</style>