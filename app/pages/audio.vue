<template>
  <div class="container">
    <button class="game-button" @click="handleClick">
      {{ buttonTitle }} l'audio
    </button>
  </div>
</template>

<script setup lang="ts">
const audio = ref<HTMLAudioElement>(new Audio("audio.mp3"));
const buttonTitle = ref("Ecouter");

audio.value.addEventListener("ended", onAudioEnded);

function handleClick() {
  if (audio.value.paused) {
    audio.value.play();
    buttonTitle.value = "Mettre en pause";
  } else {
    audio.value.pause();
    buttonTitle.value = "Reprendre";
  }
}

function onAudioEnded() {
  buttonTitle.value = "Rejouer";
}
</script>

<style lang="css">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
