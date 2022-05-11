<script setup lang="ts">
</script>

<template>
  <div class="HomeView">
    <main>
      <img alt="logo" class="logo" src="@/assets/RF_Logo_Vector.svg" width="400" height="400" />
      <h1><b>Under construction...</b></h1>
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
    display: grid;
    justify-content: center;
    justify-items: center;
    align-content: center;
    font-size: 50px;
  }
</style>