<script setup lang="ts">
  import VueWriter from 'vue-writer';
  import pButton from '@/components/elements/p-button.vue';
  import sButton from '@/components/elements/s-button.vue';

  const subtitles = [
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
  <div class="home">
    <div class="title">
      <p>Rust Factions</p>
    </div>
    <div class="subtitle">
      <vue-writer
        class="text"
        :array="subtitles"
        :typeSpeed="50"
        :delay="5000"
        :eraseSpeed="25"
      />
    </div>
    <div class="actions">
      <p-button
        type="primary"
      >
        Connect
      </p-button>
      <s-button
        type="tertiary"
      >
        Donate
      </s-button>
    </div>
  </div>
</template>

<style scoped>
  .home {
    height: 80vh;
    width: 100%;
    display: grid;
    grid-template: 
    "." 2fr
    "t" max-content
    "." .2fr
    "s" max-content
    "." .5fr
    "a" max-content
    "." 3fr / 100%;
    justify-items: center;
  }

  .title {
    grid-area: t;
    font-size: calc(4em + 8vw);
    font-weight: 700;
    line-height: 1;
    padding: 0 5% 0 5%;
  }

  .subtitle {
    grid-area: s;
    width: 100%;
    padding: 0 5% 0 5%;
    font-size: calc(1.5em + 1vw);
    line-height: 1;
    font-weight: 700;
    color: var(--text-dark);
    text-align: center;
  }

  .actions {
    padding: 0 5em 0 5em;
    width: 100%;
    grid-area: a;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
  }
</style>