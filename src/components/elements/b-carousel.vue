<script setup lang="ts">
import { toRefs, ref, type CSSProperties, computed, watch } from 'vue';


interface Props {
  images: string[];
  transitionDuration?: number;
  gap?: string;
  maxHeightDesktop?: string;
  maxHeightMobile?: string;
  single?: boolean;
  velocityThreshold?: number;
}
const props = defineProps<Props>();
let { images, transitionDuration, gap, maxHeightDesktop, maxHeightMobile, single, velocityThreshold } = toRefs(props);
const currentIndex = ref(0);

let i = 0;
const interval = setInterval(() => {
  if(i >= images.value.length) {
    clearTimeout(interval);
    return;
  }
  const image = images.value[i];
  fetch(image).then(response => {
    response.blob().then(blob => {
      loadedImages.value.push(URL.createObjectURL(blob));
    })
  });
  i++;
}, 50);

const loadedImages = ref<string[]>([]);

const x = ref(0);
const tDuration = ref(0);

const slidesStyle = computed(() => {
  return {
    transform: `translateX(${x.value}px)`,
    transition: `transform ${tDuration.value}ms ease-in-out`,
    gap: gap?.value ?? 0
  } as CSSProperties
});

const slidesRef = ref<HTMLElement>(); 
const slideRefs = ref<HTMLElement[]>([]);

const setIndex = (input: number) => {
  const newIndex = Math.max(0, Math.min(input, slideRefs.value.length - 1));
  currentIndex.value = newIndex;
  x.value = -snapPoints.value[currentIndex?.value ?? 0];
  tDuration.value = transitionDuration?.value ?? 300;
  timeout = setTimeout(() => {
    tDuration.value = 0;
  }, transitionDuration?.value ?? 300);
};

const snapPoints = computed(() => {
  const frameWidth = slidesRef.value?.clientWidth ?? 0;
  return slideRefs.value.map((r) => r.offsetLeft - ((frameWidth / 2) - (r.clientWidth / 2)));
});

const nearestIndex = (pos: number) => {
  let nearest = 0;
  let index = 0;
  for(let i = 0; i < snapPoints.value.length; i++) {
    const p = snapPoints.value[i];
    if(Math.abs(p + pos) < Math.abs(nearest + pos)) {
      nearest = p;
      index = i;
    }
  }
  return index;
}

let mousePosition = 0;
let previousX = 0;
let start: Date;
const touchStart = (e: TouchEvent) => {
  e.preventDefault();
  document.addEventListener('touchmove', touchMove);
  document.addEventListener('touchend', touchEnd);

  const first = e.touches.item(0);
  if(first) {
    const ele = first.target as HTMLElement;
    down(first.clientX, ele);
  }
};

const mouseDown = (e: MouseEvent) => {
  e.preventDefault();
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);

  const ele = e.target as HTMLElement;
  down(e.clientX, ele);
};

const down = (pos: number, target: HTMLElement) => {
  start = new Date();
  tDuration.value = 0;
  clearTimeout(timeout);
  mousePosition = pos;
  previousX = x.value;
  target.style.cursor = 'grabbing';
  target.style.userSelect = 'none';
}

const setX = (input: number) => {
  x.value = input;
};

const mouseMove = (e: MouseEvent) => {
  move(e.clientX);
};

const touchMove = (e: TouchEvent) => {
  const first = e.touches.item(0);
  if(first) {
    move(first.clientX);
  }
}

const move = (pos: number) => {
  const delta = mousePosition - pos;
  const newPos = previousX - delta;
  setX(newPos);
}

let timeout: number;
const mouseUp = (e: MouseEvent) => {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);

  const ele = e.target as HTMLElement;
  up(ele);
};

const touchEnd = (e: TouchEvent) => {
  document.removeEventListener('touchmove', touchMove);
  document.removeEventListener('touchend', touchEnd);

  const ele = e.target as HTMLElement;
  up(ele);
}

const up = (target: HTMLElement) => {
  target.style.cursor = 'grab';
  target.style.removeProperty('user-select');

  const elapsedMS = new Date().getMilliseconds() - start.getMilliseconds();
  const distance = previousX - x.value;
  const velocity = distance / elapsedMS
  if(velocity > (velocityThreshold?.value ?? .8)) {
    setIndex(currentIndex.value + 1);
  }
  else if(velocity < -(velocityThreshold?.value ?? .8)) {
    setIndex(currentIndex.value - 1);
  }
  else {
    setIndex(nearestIndex(x.value));
  }
}

const slideWidth = computed(() => {
  return single?.value ? '100%' : undefined;
})

const getAnchorClass = (index: number) => {
  let output = 'active';
  const distance = currentIndex.value - index;
  if(distance < 0) {
    for(let i = 0; i > distance; i--) {
      output += "-next"
    }
  }
  else if(distance > 0) {
    for(let i = 0; i < distance; i++) {
      output += "-prev"
    }
  }
  return output;
}

let counterTimeout;
watch(currentIndex, () => {
  const counter = document.getElementById('counter');
  if(!counter) return;
  clearTimeout(counterTimeout);
  counter.style.opacity = '.8';
  counterTimeout = setTimeout(() => {
    counter.style.opacity = '0';
  }, 2000)
})
</script>

<template>
  <div class="b-carousel">
    <div id="counter">
      {{currentIndex + 1}}/{{loadedImages.length}}
    </div>
    <div 
      class="slides"
      :style="slidesStyle"
      @mousedown="mouseDown"
      @touchstart="touchStart"
      @click="(e) => e.preventDefault()"
      ref="slidesRef"
    >
      <div 
        class="slide"
        v-for="(image, index) in loadedImages"
        :key="index"
        ref="slideRefs"
      >
        <img :src="image" :alt="images[index]"/>
      </div>
    </div>
    <div class="anchors">
      <span 
        class="anchor"
        :class="getAnchorClass(index)"
        :style="`left: ${ 16 - (currentIndex * 8)}px`"
        v-for="(image, index) in loadedImages"
        :key="index"
      ></span>
    </div>
  </div>
</template>

<style scoped>

.b-carousel {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#counter {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  background-color: var(--bg3);
  z-index: 1;
  padding: .2rem .8rem .2rem .8rem;
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 500ms ease;
  box-shadow: 0px 0px 20px -4px #000000;
}

.slides {
  width: 100%;
  height: v-bind(maxHeightDesktop);
  display: flex;
  align-items: center;
  box-sizing: content-box;
  cursor: grab;
}

.anchors {
  position: absolute;
  text-align: center;
  white-space: nowrap;
  width: 80px;
  height: 16px;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
}

.anchor {
  border-radius: 50%;
  background-color: var(--text-dark);
  transition: all 200ms ease;
  width: 8px;
  height: 8px;
  margin: 0 4px 0 4px;
  transform: matrix(.33, 0, 0, .33, 0, 0);
}

.anchor.active {
  display: inline-block;
  transform: matrix(1, 0, 0, 1, 0, 0);
  opacity: 1;
}

.anchor.active-prev, .anchor.active-next {
  display: inline-block;
  transform: matrix(.66, 0, 0, .66, 0, 0);
  opacity: .8;
}

.anchor.active-prev-prev, .anchor.active-next-next {
  display: inline-block;
  opacity: .8;
}

.slide {
  flex-shrink: 0;
  width: v-bind(slideWidth);
  max-width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  user-select: none;
}

.slide img {
  max-width: 100%;
  max-height: v-bind(maxHeightDesktop);
  object-fit: contain;
}

@media only screen and (max-width: 600px) {
  .slides {
    height: v-bind(maxHeightMobile);
  }
  .slide img {
    max-height: v-bind(maxHeightMobile);
  }
}
</style>