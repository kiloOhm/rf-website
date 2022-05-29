<script setup lang="ts">

interface Props {
  markdown: string
}
const props = defineProps<Props>()

</script>

<template>
  <div class="markdown">
    <VueShowdown :markdown="props.markdown" />
  </div>
</template>

<style scoped>
</style>