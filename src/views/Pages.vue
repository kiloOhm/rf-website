<script setup lang="ts">import type { navItem } from '@/components/navMenu.vue';
import { ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import Divider from '../components/elements/divider.vue';
import rfLoading from '@/components/elements/rf-loading.vue';
const router = useRouter()

interface Props {
  pages: navItem[],
  scrollContainer: string,
  activePage: string,
  scrollHeight: number,

}
const props = defineProps<Props>();
const { pages, activePage, scrollHeight } = toRefs(props);
const emit = defineEmits(['update:activePage']);
const pageRefs = ref();
const scrollContainer = () => document.getElementById(props.scrollContainer);
const getPageIndex = (key: string) => pages.value.findIndex((p) => p.key == key);
const getPage = (key: string) => pageRefs.value[getPageIndex(key)] as HTMLElement
defineExpose({
  scrollTo: (newValue) => {
    const ref = getPage(newValue);
    if(!ref) return;
    scrollContainer()?.scrollTo({
      top: ref.offsetTop,
      behavior: 'smooth'
    })
  }
})
watch(scrollHeight, (height) => {
  const pageMiddle = height + window.innerHeight / 2;
  for(const page of pages.value) {
    const ref = getPage(page.key);
    if(ref.offsetTop <= pageMiddle && pageMiddle < (ref.offsetTop + ref.offsetHeight)) {
      if(activePage.value != page.key) {
        emit('update:activePage', page.key);
        router.push('/' + page.key);
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
      <div :style="bg(index)" >
        <Suspense>
          <component 
            :is="page.component" 
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

</style>