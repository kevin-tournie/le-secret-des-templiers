<template>
  <div class="container">
    <iframe
      width="350"
      height="200"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=4ZrTrDPc13f1uzd1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    <button class="ready-button" @click="() => navigateTo('/qcm')">
      Continuer
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: var(--primary-color);
}

.italic-text {
  font-style: italic;
  color: var(--secondary-color);
}
.ready-button {
  margin-top: 20px;
  height: 40px;
  width: 150px;
  align-self: center;
  background-color: var(--secondary-color);
  border: 1px solid;

  font-size: medium;
  font-family: "Cinzel", sans-serif;
  color: white;
  box-shadow: 0 4px 20px rgba(176, 146, 72, 0.5);
}
</style>
