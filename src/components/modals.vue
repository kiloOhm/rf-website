<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { NModal } from 'naive-ui';
import RenderMarkdown from './render-markdown.vue';
import bCard from './elements/b-card.vue';

const modalsMD = await (await fetch('/Modals.md')).text() as string;

const router = useRouter()
watch(router.currentRoute, (newValue) => {
  const modal = newValue.params.modal as string | undefined;
  if(modal) {
    const foundModal = modals.find((m) => {
      return m.title.replaceAll(' ', '-').toUpperCase() == ('#-' + modal.toUpperCase())
    });
    if(!foundModal) return;
    foundModal.show = true;
  }
});

interface modalInfo {
  title: string;
  content: string;
  show: boolean;
}

const modals = reactive(modalsMD.replaceAll('\r', '').split(/^# /gm).filter((p) => p).map((p) => {
  const lines = p.split('\n');
  return {
    title: '# ' + lines.shift(),
    content: lines.join('\n'),
    show: false,
  } as modalInfo
}));

const close = () => {
  const target = '/' + router.currentRoute.value.fullPath.split('/').filter((p) => p).slice(2).reverse().join('/');
  router.push(target)
}
</script>

<template>
  <div class="modals">
    <div 
      class="modal"
      v-for="(modal, index) in modals"
      :key="index"
    >
      <n-modal 
        class="modal"
        v-model:show="modal.show"
        style="max-width: 90%; max-height: 90%; overflow: auto; width: max-content"
        @after-leave="close()"
      >
        <b-card
          class="card"
          :closable="true"
          @close="modal.show = false"
        >
          <template #header>
            <div class="header">
              <render-markdown 
                :markdown="modal.title"
              />
            </div>
          </template>
          <div class="content">
            <render-markdown 
              :markdown="modal.content"
            />
          </div>
        </b-card>
      </n-modal>
    </div>
  </div>
</template>

<style scoped>

  .card {
    margin: auto;
  }

  .header {
    text-align: center;
  }

  .content :deep() img {
    max-height: 50vh;
  }

  .content {
    padding: 1rem;
    font-size: x-large;
    overflow-wrap: break-word;
    font-weight: 700;
  }

</style>