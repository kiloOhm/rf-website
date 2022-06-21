<script setup lang="ts">

</script>

<template>
  <div class="b-card">
    <div class="b-card__header" role="heading" aria-level="2">
      <slot name="header"></slot>
  </div>
  <div class="b-card__content">
    <slot></slot>
  </div>
  <div class="b-card__footer">
    <slot name="footer"></slot>
  </div>
  <div class="b-card__action">
    <slot name="action"></slot>
  </div>
</div>
</template>

<style scoped>
  .b-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow);
    margin: 1em;
    background-color: var(--bg2);
    border-radius: 3px;
    border: 1px solid var(--bg2_5);
  }

  .b-card__header {
    overflow: hidden;
    border: 1px solid var(--bg2_5);
  }

  .b-card__footer {
    border-top: 1px solid var(--bg2_5);
  }

  .b-card__action {
    background-color: var(--bg2_5);
  }
</style>