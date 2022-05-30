<script setup lang="ts">
  import VueWriter from 'vue-writer';
  import pButton from '@/components/elements/p-button.vue';
  import sButton from '@/components/elements/s-button.vue';
import { useRouter } from 'vue-router';

  const subtitles = [
    'Wake up at the beach...',
    'Hit a tree with a rock',
    'Get chased by a bear...',
    'Get saved by a hunter...',
    'Put your hands up...',
    'Receive a bow from the hunter...',
    'Be confused... Move on...',
    'Run along the road...',
    'Hit barrels...',
    'Get chased off by grumpy road farmer...',
    'Ride your horse to town...',
    'Haggle with traders...',
    'Get recruited for an expedition to the badlands...',
    'Clear and loot Trainyard...',
    'Save your teammate from a hostile...',
    'Join their faction...',
    'Be promoted to number two...',
    'Recruit new members...',
    'Meet a friendly scientist...',
    'Participate in an experiment...',
    'Lose consciousness...',
  ]

  const router = useRouter();
</script>

<template>
  <div class="home">
    <div class="overlay"></div>
    <div class="video-container">
      <video 
        src="/WebsiteMainPageBackground.mp4"
        autoplay
        muted
        loop
        class="bg-video"
      ></video>
    </div>
    <div class="title">
      <p>Rust Factions</p>
    </div>
    <div class="subtitle">
      <vue-writer
        class="text"
        :array="subtitles"
        :typeSpeed="50"
        :delay="2000"
        :eraseSpeed="25"
      />
    </div>
    <div class="actions">
      <p-button
        class="connect-btn"
      >
        Connect
      </p-button>
      <p-button
        class="contact-btn"
        @click="router.push('/contact')"
      >
        Contact
      </p-button>
      <s-button
        @click="router.push('/donate')"
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
    text-shadow: 1px 1px 1px #00000066;
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
    text-shadow: 1px 1px 1px #00000066;
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

  .video-container {
    position: absolute;
    width: 100%;
    height: 105%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
  }

  .bg-video {
    position: absolute;
    /* object-fit: cover; */
    z-index: -1;
    filter: blur(5px);
  }

@media only screen and (min-width: 1920px) {
  .video-container {
    width: 100%;
    height: 100vh;
  }
  .bg-video {
    transform: scale(2);
  }
}

  .overlay {
    position: absolute;
    width: 100%;
    height: 105%;
    background-color: #00000088;
    z-index: 0;
  }

  @media only screen and (min-width: 600px) {
    .contact-btn {
      display: none;
    }
  }
  @media only screen and (max-width: 600px) {
    .connect-btn {
      display: none;
    }
  }
</style>