<script setup lang="ts">
import axios from 'axios';

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

const { data } = await axios.get(props.url);
</script>

<template>
  <div class="markdown">
    <VueShowdown :markdown="data" />
  </div>
</template>

<style scoped>
</style>