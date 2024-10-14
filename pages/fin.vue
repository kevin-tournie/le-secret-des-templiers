<template>
  <div>Fin de partie</div>
  <UButton @click="handleClick">Tableau des scores</UButton>
</template>

<script setup lang="ts">
const { clear } = useUserSession();

definePageMeta({
  middleware: "auth",
});

async function handleClick() {
  clear();
  localStorage.removeItem("countdownStartTime");
  localStorage.removeItem("countdownTotalTime");
  await navigateTo("/accueil");
}
</script>
