<script setup lang="ts">
import axios from 'axios';
import { NCard, NAvatar, NIcon, NBadge } from 'naive-ui';
import { onMounted } from 'vue';
import pButton from '@/components/elements/p-button.vue';
import sButton from '@/components/elements/s-button.vue';
import { PersonOutline, BedOutline } from '@vicons/ionicons5'

interface ServerInfo {
  name: string;
  img: string;
  ip: string | undefined;
  description: string | undefined;
  rules: string | undefined;
  up: boolean | undefined;
  players: number | undefined;
  maxPlayers: number | undefined;
  sleepers: number | undefined;
}

const servers= (await axios.get('/Servers.json')).data as ServerInfo[];
try {
  const serverInfo = (await axios.get('https://rf-backend.onrender.com', {
    timeout: 2000,
  })).data;
  for(const s of servers) {
    try {
      if(s.name in serverInfo) {
        s.up = true;
      }
      const data = serverInfo[s.name];
      s.players = data.players
      s.maxPlayers = data.maxplayers
      s.sleepers = data.sleepers
    }
    catch (err) {
      console.error(err);
    }
  }
}
// eslint-disable-next-line no-empty
catch(err) {}

const newTab = (url: string | undefined) => {
  window.open(url, '_blank')?.focus();
}

const connectLink = (ip: string | undefined) => {
  return `steam://connect/${ip}`;
}

const emit = defineEmits(['ready'])
let init = false;
onMounted(() => {
  if(init) return;
  emit('ready', 'servers');
})
</script>

<template>
  <div class="servers">
    <n-card
      :segmented="{
        content: true,
        footer: 'soft'
      }"
      class="card"
      v-for="(server, index) in servers"
      :key="index"
    >
      <template #header>
        <div 
          class="h-background"
          :style="`background-image: url(${server.img});`"
        ></div>
        <p
          class="header"
        >{{server.name}}</p>
      </template>
      <p>{{server.description}}</p>
      <template #footer>
        <div 
          class="footer"
          v-if="server.up"
        >
          <n-badge 
            v-if="server.players || server.maxPlayers"
            :value="`${server.players}/${server.maxPlayers}`"
            class="badge"
          >
            <n-avatar
              round
            >
              <img 
                class="user"
                src="/user_icon.png" 
                alt="user icon"
              >
            </n-avatar>
          </n-badge>
          <n-badge 
            v-if="server.sleepers"
            :value="`${server.sleepers}`"
            class="badge"
          >
            <n-avatar
              round
              
            >
              <img 
                class="sleeper"
                src="/sleep_icon3.png" 
                alt="sleeper icon"
              >
            </n-avatar>
          </n-badge>
        </div>
      </template>
      <template #action>
        <p-button
          class="connect-btn"
          v-if="server.ip"
          @click="newTab(connectLink(server.ip))"
        >
          Connect
        </p-button>
        <s-button
          class="rules-btn"
          v-if="server.rules"
          @click="newTab(server.rules)"
        >
          Rules
        </s-button>
      </template>
    </n-card>
  </div>
</template>

<style scoped>
.servers {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
  margin: auto;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.card :deep() .n-avatar.user img {
  padding: 4px;
}
.card :deep() .n-avatar.sleeper img {
  padding: 6px;
}

.badge :deep() .n-badge-sup {
  background-color: var(--accent);
}

.card {
  width: min-content;
}

.card :deep() .n-card-header {
  padding: 0;
  overflow: hidden;
}

.card :deep() .header {
  text-align: center;
  font-size: xxx-large;
  font-weight: 700;
  text-shadow: 1px 1px 1px #00000066;
  margin: 1rem;
  margin-bottom: 5rem;
}
.card :deep() .h-background {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  filter: blur(2px) brightness(80%);
}

.card :deep() .n-card__content {
  font-size: large;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card :deep() .n-card__footer {
  font-size: medium;
  display: flex;
  justify-content: space-evenly;
}

.card :deep() .n-card__action {
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

</style>