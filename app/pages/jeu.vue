<template>
  <Layout>
    <div class="countdown-container">
      <div class="header">
        <h1>{{ user?.team }}</h1>
        <h2>{{ user?.companyName }}</h2>
      </div>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="#e6e6e6"
          stroke-width="10"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="#3498db"
          stroke-width="10"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div class="time-display">{{ formattedTime }}</div>
      <NuxtLink to="/indice-question">Indice</NuxtLink>
      <NuxtLink to="/fin">Fin de la partie</NuxtLink>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formattedTime, maxTimer, timer } from "~/store/timer";

definePageMeta({
  middleware: "auth",
});

const totalTime = maxTimer; // 1 hour in seconds
const circumference = 2 * Math.PI * 90; // 2 * PI * radius

const strokeDashoffset = computed(() => {
  return circumference - (timer.value / totalTime) * circumference;
});

const { user } = useUserSession();
</script>

<style scoped>
.countdown-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-size: 2em;
}

.header h2 {
  margin: 0;
  font-size: 1.5em;
  color: #555;
}

.time-display {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>
