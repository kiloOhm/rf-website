<script setup lang="ts">
  import pButton from '@/components/elements/p-button.vue';
  import sButton from '@/components/elements/s-button.vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import bTyper from '@/components/elements/b-typer.vue';

  const subtitles = ((await axios.get('/Subtitles.txt')).data as string).split('\n');
  const router = useRouter();
</script>

<template>
  <div class="home">
    <div class="video-container">
      <video 
        class="bg-video"
        src="/WebsiteMainPageBackground.mp4"
        autoplay
        muted
        loop
        poster="/poster.webp"
        width="1920"
        height="1080"
      ></video>
    </div>
    <div class="overlay">
      <div class="title">
        <p>Rust Factions</p>
      </div>
      <div class="subtitle">
        <b-typer
          :lines="subtitles"
          :typeSpeed="50"
          :eraseSpeed="50"
          :delay="1000"
        />
      </div>
      <div class="actions">
        <p-button
          class="connect-btn"
          @click="router.push('/servers')"
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
  </div>
</template>

<style scoped>
  .home {
    height: 80vh;
    width: 100%;
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
    height: 1em;
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
    object-fit: fill;
    z-index: 0;
    filter: blur(3px) brightness(.4);
    transform: scale(2);
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 105%;
    z-index: 1;
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