<script setup lang="ts">
</script>

<template>
  <div class="underConstruction">
    <div class="logo">
      <img alt="logo" class="logo" src="@/assets/RF_Logo_Vector.svg" />
    </div>
    <div class="text">
      <p>Under construction...</p>
    </div>
  </div>
</template>

<style scoped>
  .underConstruction {
    justify-content: center;
    justify-items: center;
    align-content: center;
    font-size: calc(1em + 5vw);
    display: grid;
    grid-template: 
    ". logo ." 85%
    "text text text" 1fr / 1fr 50% 1fr;
  }

  .logo {
    grid-area: logo;
    width: 100%;
  }

  .text {
    grid-area: text;
    width: 100%;
    text-align: center;
    margin: 0px;
    padding: 0px;
  }
</style>