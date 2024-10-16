<template>
  <div
    class="flex justify-center items-center flex-col min-h-screen bg-gray-100"
  >
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
    <UButton>
      <NuxtLink to="/jeu">Continuer</NuxtLink>
    </UButton>
    Le compte à rebours débutera après avoir appuyer sur le bouton
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
