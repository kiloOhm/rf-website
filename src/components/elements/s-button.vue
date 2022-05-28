<template>
  <button class="s-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.s-button {
  padding: .3em .8em .3em .8em;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: xx-large;
  font-weight: 700;
  color: var(--text);
  background: var(--bg2);
  border: none;
  border: 2px solid var(--bg3);
}

.s-button:hover {
  cursor: pointer;
  background-color: var(--bg3);

}
</style>