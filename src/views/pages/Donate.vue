<script setup lang="ts">
import donoPackage from '@/components/dono-package.vue';

const packagesMD = await (await fetch('/DonationPackages.md')).text();
interface packageInfo {
  title: string;
  image: string;
  url: string;
  text: string;
}
const packages = packagesMD.split('#').filter((p) => p).map((p) => {
  const lines = p.split('\n');
  return {
    title: lines.shift(),
    image: extractLinkFromMdLink(lines.shift() ?? ''),
    url: extractLinkFromMdLink(lines.shift() ?? ''),
    text: lines.join('\n'),
  } as packageInfo
});

function extractLinkFromMdLink(md: string) {
  return md.substring(md.lastIndexOf('(') + 1, md.lastIndexOf(')'));
}
</script>

<template>
  <div class="donate">
    <p>This server is run by volunteers who invest their own time and money to give you the ultimate Rust experience. If you'd like to help us keep the lights on, please consider purchasing a package!</p>
    <div class="packages">
      <dono-package
        v-for="(p, index) in packages"
        :key="index"
        :title="p.title"
        :image="p.image"
        :url="p.url"
        :text="p.text"
      />
    </div>
    <p>We greatly appreciate all of your support!</p>
  </div>
</template>

<style scoped>
.donate {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em 0 2em 0;
}

.packages {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  max-width: 90%;
  gap: 1em;
  margin: 2rem 0 2rem 0;
}

.donate p {
  width: 90%;
  max-width: 64ch;
  font-size: x-large;
  font-weight: 700;
  text-align: center;
}
</style>
