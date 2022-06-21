<script setup lang="ts">
import { toRefs, ref } from 'vue';

interface Props {
  closable?: boolean; 
}
const props = defineProps<Props>();
const { closable } = toRefs(props);
const emit = defineEmits(['close']);

</script>

<template>
  <div class="b-card">
    <div 
      class="close"
      v-if="closable"
      @click="emit('close')"
    >
      <div class="line 1"></div>
      <div class="line 2"></div>
    </div>
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

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--bg3);
    z-index: 1;
  }

  .close:hover {
    background-color: var(--bg3_5);
  }

  .close .line {
    position: absolute;
    width: 60%;
    height: 2px;
    background-color: var(--text-dark);
  }

  .close .line:nth-child(1) {
    transform: rotate(45deg);
  }
  .close .line:nth-child(2) {
    transform: rotate(-45deg);
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