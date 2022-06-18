<script setup lang="ts">import type { navItem } from '@/components/navMenu.vue';
import { nextTick, ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import Divider from '../components/elements/divider.vue';
import rfLoading from '@/components/elements/rf-loading.vue';
const router = useRouter()

interface Props {
  pages: navItem[],
  scrollContainer: string,
  activePage: string,
  scrollHeight: number,
  scrolling: boolean,
}
const props = defineProps<Props>();
const { pages, activePage, scrollHeight, scrolling } = toRefs(props);
const emit = defineEmits(['update:activePage']);
const pageRefs = ref();
const scrollContainer = () => document.getElementById(props.scrollContainer);
const getPageIndex = (key: string) => pages.value.findIndex((p) => p.key == key);
const getPage = (key: string) => pageRefs.value[getPageIndex(key)] as HTMLElement
const scrollPushed = ref(false);
watch(router.currentRoute, (newValue) => {
  if(scrolling.value) return;
  waitUntilReady(() => {
    scrollTo(newValue.params.page);
  })
})
const scrollTo = (newValue) => {
  const ref = getPage(newValue);
  if(!ref) return;
  ref.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
};
watch(scrollHeight, (height) => {
  const pageMiddle = height + window.innerHeight / 2;
  for(const page of pages.value) {
    const ref = getPage(page.key);
    if(ref.offsetTop <= pageMiddle && pageMiddle < (ref.offsetTop + ref.offsetHeight)) {
      if(activePage.value != page.key) {
        emit('update:activePage', page.key);
        router.push('/' + page.key);
        scrollPushed.value = true;
      }
      return;
    }
  }
});
const bg1Zebra = getComputedStyle(document.documentElement).getPropertyValue('--bg1-zebra');
const bg = (i: number) => {
  if(i % 2 != 0) {
    return `background-color: ${bg1Zebra}`;
  }
}
const waitUntilReady = (callback: () => void) => {
  let allReady = true;
  for(const p of pages.value) {
    if(!p.ready) {
      allReady = false;
      break;
    }
  }
  if(allReady) {
    callback?.();
    return;
  }
  setTimeout(() => {
    waitUntilReady(callback);
  }, 1000);
}
const ready = (key: string) => {
  pages.value[getPageIndex(key)].ready = true;
}
</script>

<template>
  <div class="pages">
    <div
      class="page"
      v-for="(page, index) in pages"
      :key="index"
      ref="pageRefs"
    >
      <divider
        v-if="index > 0"
        :color="bg1Zebra"
        :flip="(index % 2) == 0"
      />
      <div
        class="content"
        :style="bg(index)" 
      >
        <div
          v-if="page.header"
          class="header"
        >
          {{ page.header }}
        </div>
        <Suspense>
          <component 
            :is="page.component" 
            @ready="(key) => ready(key)"
          />
          <template #fallback>
            <rf-loading />
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style scoped>

.pages {
  width: 100%;
  height: 100%;
}

.content .header {
  color: var(--text-dark);
  font-size: 3em;
  font-weight: 700;
  opacity: .2;
  z-index: 2;
}

</style>