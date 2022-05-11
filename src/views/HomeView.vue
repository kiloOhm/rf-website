<script setup lang="ts">
import { Suspense } from "vue";
import UnderConstruction from "../components/under-construction.vue";

</script>

<template>
  <div class="HomeView">
    <main>
      <Suspense>
        <UnderConstruction />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </main>
  </div>
</template>

<style scoped>
  .HomeView {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template: 
    ". . ." 1fr
    ". main ." max-content
    ". . ." 1fr / 1fr max-content 1fr;
  }

  main {
    grid-area: main;
  }
</style>