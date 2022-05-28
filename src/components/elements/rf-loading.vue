<script setup lang="ts">
  import VueWriter from 'vue-writer';
  const bullshit = [
    'Waking up on the beach...',
    'Hitting a tree with a rock...',
    'Getting chased by a bear...',
    'Building a campfire...',
    'Crafting a hatchet...',
    'Running the road...',
    'Hitting barrels...',
    'Getting chased off by a grumpy road farmer...',
    'Crafting a bow...',
    'Hunting a boar...',
    'Meeting a friendly scientist...',
    'Participating in an experiment...',
    'Losing consciousness...'
  ]
</script>

<template>
  <div class="loading">
    <img alt="loading" class="loading" src="@/assets/lavalamp.svg" />
    <vue-writer
      class="text"
      :array="bullshit"
      :typeSpeed="50"
      :eraseSpeed="25"
    />
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
}

.text {
  text-align: center;
  font-size: x-large;
  font-weight: 700;
}

</style>