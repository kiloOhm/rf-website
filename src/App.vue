<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { ref, Suspense, watch } from "vue";
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


const expandNav = ref(false);
const toggleExpandNav = () => {
  if(expandNav.value) expandNav.value = false;
  else expandNav.value = true;
}
const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text');

const navItems = ref<navItem[]>([
  {
    title: 'Home',
    key: 'home',
  },
  {
    title: 'Rules',
    key: 'rules',
  },
  {
    title: 'Media',
    key: 'media',
  },
  {
    title: 'Plugins',
    key: 'plugins',
  },
  {
    title: 'Donate',
    key: 'donate',
  },
  {
    title: 'Contact',
    key: 'contact',
  }
])
const router = useRouter()
const activeItem = ref('home');
watch(activeItem, (newValue, oldValue) => {
  if(expandNav.value) {
  setTimeout(() => {
    expandNav.value = false;
    router.push(('/' + newValue))
  }, 100)
  }
});
const page = computed(() => {
  return router.currentRoute.value.params['page'];
})
watch(page, (newValue) => {
  console.log(newValue);
})
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
                  v-model:active="activeItem"
                  :items="navItems"
                  gap="2em"
                />
              </div>
            </div>
          </div>
          <div class="content">
            <n-collapse-transition :show="expandNav">            
              <div class="nav-menu">
                <nav-menu 
                  v-model:active="activeItem"
                  vertical
                  :items="navItems"
                />
              </div>
            </n-collapse-transition>
            <div id="scroll-container">              
                <Suspense>
                  <router-view v-slot="{ Component }">
                    <transition name="fade">
                      <component :is="Component" />
                    </transition>
                  </router-view>
                  <template #fallback>
                    <rf-loading />
                  </template>
                </Suspense>
              </div>
              <scroll-to-top
                target="scroll-container"
              />
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
  display: table;
}

.header-container {
  display: table-row;
  height: 0px;
}

.header {
  margin: 1em 0 1em 0;
  display: grid;
  grid-template: 
  ". l . n ." 1fr / 2em min-content 1fr max-content 2em;
  align-items: center;
}

.content {
  display: table-cell;
  height: 100%;
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
  width: 3em;
  height: 3em;
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

</style>
