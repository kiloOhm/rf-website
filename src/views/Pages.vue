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
const scrollPushed = ref(false);
watch(router.currentRoute, (newValue) => {
  if(scrolling.value) return;
  nextTick(() => {
    scrollTo(newValue.hash);
  });
})
const scrollTo = (newValue) => {
  const ref = document.getElementById(newValue.substring(1));
  if(!ref) return;
  ref.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
};
watch(scrollHeight, (height) => {
  const pageMiddle = height + window.innerHeight / 2;
  for(const page of pages.value) {
    const ref = document.getElementById(page.key.substring(1));
    if(!ref) return;
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
</script>

<template>
  <div class="pages">
    <section
      class="page"
      :id="page.key.substring(1)"
      v-for="(page, index) in pages"
      :key="index"
      ref="pageRefs"
    >
      <divider
        v-if="index > 0"
        :color="bg1Zebra"
        :flip="(index % 2) == 1"
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
          />
          <template #fallback>
            <rf-loading />
          </template>
        </Suspense>
      </div>
    </section>
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
  opacity: .5;
  z-index: 2;
}

</style>