<script setup lang="ts">
import { useRouter } from "vue-router";
import { h, nextTick, ref, Suspense, watch } from "vue";
import rfLoading from "@/components/elements/rf-loading.vue";
import { 
  NConfigProvider, 
  darkTheme, 
  NNotificationProvider, 
  NThemeEditor,
  NCollapseTransition
} from 'naive-ui'
import Sandwich from './components/elements/sandwich.vue'
import NavMenu from './components/navMenu.vue'
import type { navItem } from  './components/navMenu.vue'
import { computed } from "@vue/reactivity";
import scrollToTop from "./components/elements/scroll-to-top.vue";
import Home from "./views/pages/Home.vue";
import Pages from "./views/Pages.vue";
import { throttle } from 'lodash';
import Plugins from "./views/pages/Plugins.vue";
import Rules from "./views/pages/Rules.vue";
import Media from "./views/pages/Media.vue";
import Donate from "./views/pages/Donate.vue";
import Contact from "./views/pages/Contact.vue";

const expandNav = ref(false);
const toggleExpandNav = () => {
  if(expandNav.value) expandNav.value = false;
  else expandNav.value = true;
}
const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text');

const pages = ref<navItem[]>([
  {
    title: 'Home',
    key: 'home',
    component: h(Home)
  },
  {
    title: 'Rules',
    key: 'rules',
    component: h(Rules)
  },
  {
    title: 'Media',
    key: 'media',
    component: h(Media)
  },
  {
    title: 'Plugins',
    key: 'plugins',
    component: h(Plugins)
  },
  {
    title: 'Donate',
    key: 'donate',
    component: h(Donate)
  },
  {
    title: 'Contact',
    key: 'contact',
    component: h(Contact)
  }
])
const router = useRouter()
let init = false;
watch(router.currentRoute, (newValue) => {
  if(init) return;
  init = true;
  pagesRef.value?.scrollTo(newValue.path.substring(1));
})
const activePage = ref('home');
watch(activePage, (newValue, oldValue) => {
  if(expandNav.value) {
    expandNav.value = false;
  }
});
const page = computed(() => {
  return router.currentRoute.value.params['page'];
})
watch(page, (newValue) => {
  console.log(newValue);
})
const scrollContainer = () => document.getElementById('scroll-container');
const scrollTopAmount = ref(0);
const setScrollTopAmount = throttle((amount) => {
  scrollTopAmount.value = amount;
}, 200);
nextTick(() => {
  scrollContainer()?.addEventListener('scroll', function(e) {
    setScrollTopAmount(this.scrollTop);
  })
})
const showScrollToTop = computed(() => {
  return scrollTopAmount.value > window.innerHeight / 2;
})
const pagesRef = ref();
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <!-- <n-theme-editor> -->
      <n-notification-provider>
        <main>
          <div class="header-container">
            <div class="header">
              <img alt="logo" class="logo" src="@/assets/RF_Logo_Vector.svg" />
                <div class="sandwich">
                <sandwich
                  direction="bottom" 
                  :active="expandNav" 
                  @click="toggleExpandNav()"
                  :color="textColor"
                />
              </div>
              <div class="nav">
                <nav-menu 
                  :active="activePage"
                  @update:active="(page) => pagesRef.scrollTo(page)"
                  :items="pages"
                  gap="2em"
                />
              </div>
            </div>
          </div>
          <div class="content">
            <n-collapse-transition :show="expandNav">            
              <div class="nav-menu">
                <nav-menu 
                  :active="activePage"
                  @update:active="(page) => pagesRef.scrollTo(page)"
                  vertical
                  :items="pages"
                />
              </div>
            </n-collapse-transition>
            <div id="scroll-container">              
              <Pages
                ref="pagesRef"
                :pages="pages"
                scroll-container="scroll-container"
                v-model:active-page="activePage"
                :scroll-height="scrollTopAmount"
              />
            </div>
            <Transition>
              <scroll-to-top
                v-if="showScrollToTop"
                target="scroll-container"
              />
            </Transition>
          </div>
        </main>
      </n-notification-provider>
    <!-- </n-theme-editor> -->
  </n-config-provider>
</template>

<style>
@import '@/assets/base.css';

</style>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template: 
  "h" 90px
  "c" calc(100vh - 90px) / 1fr;
}

.header-container {
  grid-area: h;
}

.header {
  margin: 1em 0 1em 0;
  display: grid;
  grid-template: 
  ". l . n ." 1fr / 2em min-content 1fr max-content 2em;
  align-items: center;
}

.content {
  grid-area: c;
}

#scroll-container {
  height: 100%;
  overflow: auto;
}

.logo {
  grid-area: l;
  box-sizing: border-box;
}

.sandwich {
  grid-area: n;
  display: block;
  width: 2em;
  height: 1.5em;
}

.nav {
  grid-area: n;
  width: max-content;
}

.nav-menu {
  background-color: var(--bg2);
  display: flex;
  justify-content: center;
  padding: 1em;
}

@media only screen and (max-width: 600px) {
  .nav {
    display: none;
  }
}

@media only screen and (min-width: 600px) {
  .sandwich {
    display: none;
  }
  .nav-menu {
    display: none;
  }
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
