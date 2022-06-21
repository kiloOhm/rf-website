<script setup lang="ts">
import { call } from 'naive-ui/es/_utils';
import { ref, toRefs } from 'vue';
interface Props {
  lines: string[];
  typeSpeed: number;
  eraseSpeed: number;
  delay: number;
}
const props = defineProps<Props>();
const { lines, typeSpeed, eraseSpeed, delay } = toRefs(props);

const currentValue = ref<string>('');

let currentLine = 0;
const write = (callback: () => void) => {
  const line = lines.value[currentLine];
  let i = 0;
  const interval = setInterval(() => {
    if(i >= line.length) {
      clearInterval(interval);
      setTimeout(() => {
        callback();
      }, delay.value);
      return;
    }
    currentValue.value += line.charAt(i);
    i++;
  }, typeSpeed.value);
}

const erase = (callback: () => void) => {
  let i = currentValue.value.length;
  const interval = setInterval(() => {
    if(i < 0) {
      clearInterval(interval);
      callback();
      return;
    }
    currentValue.value = currentValue.value.slice(0, i);
    i--;
  }, eraseSpeed.value);
}

const start = () => {
  if(currentLine >= lines.value.length) {
    currentLine = 0;
  }
  write(() => erase(start));
  currentLine++;
}
start();
</script>

<template>
  <div class="b-typer">
    <p>{{currentValue}}</p>
  </div>
</template>

<style scoped>

</style>