<script setup lang="ts">
import { computed } from '@vue/reactivity';

interface Props {
  direction?: 'left' | 'right' | 'top' | 'bottom'
  active: boolean
  color?: string
}
const props = defineProps<Props>();

const style = computed(() => {
  return `background-color: ${props.color ?? 'white'}`
})
const _class = computed(() => {
  return `${props.direction ?? 'right'}${props.active ? ' active' : ''}`;
})
</script>

<template>
  <div class="sandwich">
    <div class="container" :class="_class">
      <div class="_top" :style="style"></div>
      <div class="_mid" :style="style"></div>
      <div class="_bot" :style="style"></div>
    </div>
  </div>
</template>

<style scoped>
.sandwich {
  width: 100%;
  height: 100%;
  display: block;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform .2s ease-in;
}

.container.top.active {
  transform: rotate(-90deg);
}
.container.bottom.active {
  transform: rotate(90deg);
}

._top, ._mid, ._bot {
  width: 100%;
  height: 12%;
  transition: transform .2s ease-in;
}

.right.active ._top, .top.active ._top, .bottom.active ._top
{
  transform: translate(20%, 100%) rotate(45deg);
}
.right.active ._bot, .top.active ._bot, .bottom.active ._bot
{
  transform: translate(20%, -100%) rotate(-45deg);
}
.left.active ._top
{
  transform: translate(-20%, 100%) rotate(-45deg);
}
.left.active ._bot
{
  transform: translate(-20%, -100%) rotate(45deg);
}
</style>