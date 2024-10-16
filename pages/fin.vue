<template>
  <div>Fin de partie</div>
  <UButton @click="navigateTo('/accueil')">Tableau des scores</UButton>
</template>

<script setup lang="ts">
import { timer } from "~/store/timer";

const { clear } = useUserSession();

definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  const malus = localStorage.getItem("malus");

  await $fetch("/api/end", {
    method: "POST",
    body: {
      timer: timer.value,
      malus: malus !== null ? JSON.parse(malus) : 0,
    },
  });

  localStorage.removeItem("countdownStartTime");
  localStorage.removeItem("countdownTotalTime");
  localStorage.removeItem("malus");

  clear();
});
</script>
