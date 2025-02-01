<template>
  <Layout>
    <div class="countdown-container">
      <div class="header">
        <h1>{{ user?.team }}</h1>
        <h2>{{ user?.companyName }}</h2>
      </div>
      <button class="game-button" @click="() => navigateTo('/indice-question')">
        Indice
      </button>
      <button class="game-button" @click="handleEndgameClick">
        Fin de la partie
      </button>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        style="margin-top: 40px"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="#00585C"
          stroke-width="10"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="#B09248"
          stroke-width="10"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div class="time-display">{{ formattedTime }}</div>
    </div>
    <EndgameDialogBox
      v-model:showDialog="showDialog"
      @update:show-dialog="(value: boolean) => showDialog = value"
    />
  </Layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formattedTime, maxTimer, timer } from "~/store/timer";

const showDialog = ref(false);

definePageMeta({
  middleware: "auth",
});

const totalTime = maxTimer; // 1 hour in seconds
const circumference = 2 * Math.PI * 90; // 2 * PI * radius

const strokeDashoffset = computed(() => {
  return circumference - (timer.value / totalTime) * circumference;
});

const { user } = useUserSession();

async function handleEndgameClick() {
  showDialog.value = true;
}
</script>

<style scoped>
.countdown-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-family: "Cinzel", sans-serif;
  font-weight: 600;
  color: #dfd3b5;
}

.header h2 {
  margin: 0;
  font-family: "Cinzel", sans-serif;
  font-weight: 400;
  color: #dfd3b5;
}

.time-display {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: #dfd3b5;
  margin-top: 20px;
  font-family: "Cinzel", sans-serif;
  position: absolute;
  bottom: 17%;
}
</style>
