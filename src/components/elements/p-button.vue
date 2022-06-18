<template>
  <button class="p-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.p-button {
  padding: .3em .8em .3em .8em;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: xx-large;
  font-weight: 700;
  color: var(--text);
  background: var(--accent);
  border: none;
}

.p-button:hover {
  cursor: pointer;
  background-color: var(--accent-dark);
}
</style>