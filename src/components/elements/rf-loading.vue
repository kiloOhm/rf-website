<script setup lang="ts">
  import bTyper from './b-typer.vue';
</script>

<template>
  <div class="loading">
    <div class="content">
      <img alt="loading" class="loading" src="@/assets/lavalamp.svg" />
      <div class="text">
        <p>loading</p>
        <b-typer
          :lines="['loading...']"
          :typeSpeed="50"
          :eraseSpeed="50"
          :delay="1000"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: start;
}

.text {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-size: x-large;
  font-weight: 700;
}
</style>