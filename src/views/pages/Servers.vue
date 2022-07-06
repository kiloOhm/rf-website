<script setup lang="ts">
import { NAvatar, NTag, NBadge } from 'naive-ui';
import { reactive } from 'vue';
import pButton from '@/components/elements/p-button.vue';
import sButton from '@/components/elements/s-button.vue';
import md from '@/components/render-markdown.vue';
import bCard from '@/components/elements/b-card.vue';
import axios from 'axios';

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

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const servers = await (await fetch('/Servers.json')).json() as ServerInfo[];
const _servers = reactive(servers);
try {
  axios.post("https://rf-backend.onrender.com",
      {
        servers: Object.fromEntries(servers.map((s) => [s.name, s.ip]))
      }
    ).then(async (response) =>{
    const json = response.data;
    console.log(json);
    for(const s of _servers) {
    try {
      if(s.name in json) {
        s.up = true;
      }
      const data = json[s.name];
      s.players = data.players
      s.maxPlayers = data.maxplayers
      s.sleepers = data.sleepers
    }
    // eslint-disable-next-line no-empty    
    catch (err) {}
  }
  })
}
// eslint-disable-next-line no-empty    
catch(err) {}

const newTab = (url: string | undefined) => {
  window.open(url, '_blank')?.focus();
}

const connectLink = (ip: string | undefined) => {
  return `steam://connect/${ip}`;
}
</script>

<template>
  <div class="servers">
    <b-card
      class="card"
      v-for="(server, index) in _servers"
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
        <md
          :style="'font-size: large; font-weight: 400;'"
          :markdown="server.description ?? ''"
        />
      <template #footer>
        <div class="online"
          v-if="server.up"
        >
          <n-tag 
            type="success"
            round
          >
            Online
          </n-tag>
        </div>
        <div class="offline"
          v-else
        >
          <n-tag 
            type="error"
            round
          >
            Offline
          </n-tag>
        </div>
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
                src="/icons/user_icon.png" 
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
                src="/icons/sleep_icon3.png" 
                alt="sleeper icon"
              >
            </n-avatar>
          </n-badge>
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
    </b-card>
  </div>
</template>

<style scoped>
.online, .offline {
  filter: brightness(2);
}

@media only screen and (max-width: 600px) {
  .connect-btn {
    display: none;
  }
}

.servers {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
  margin: auto;
  flex-wrap: wrap;
}

.card :deep() .n-avatar img.user {
  transform: scale(1.5);
}
.card :deep() .n-avatar img.sleeper {
  transform: scale(1.5);
}

.badge :deep() .n-badge-sup {
  background-color: var(--accent);
}

.card {
  width: 400px;
  max-width: 90vw;
  height: 510px;
}

.card :deep() .b-card-header {
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

.card :deep() .b-card__content {
  padding: 2em;
}

.card :deep() .b-card__footer {
  padding: 1rem;
  font-size: medium;
  display: flex;
  justify-content: space-evenly;
}

.card :deep() .b-card__action {
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

</style>