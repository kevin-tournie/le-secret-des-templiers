<template>
  <div class="countdown-container">
    <div class="header">
      <h1>{{ user.team }}</h1>
      <h2>{{ user.companyName }} </h2>
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
    <NuxtLink to="/indice_question">Logo</NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const totalTime = 3600; // 1 hour in seconds
const timeLeft = ref(totalTime);
const intervalId = ref(null);
const circumference = 2 * Math.PI * 90; // 2 * PI * radius

const strokeDashoffset = computed(() => {
  return circumference - (timeLeft.value / totalTime) * circumference;
});

const formattedTime = computed(() => {
  const hours = Math.floor(timeLeft.value / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((timeLeft.value % 3600) / 60).toString().padStart(2, '0');
  const seconds = (timeLeft.value % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});

const startCountdown = () => {
  const savedStartTime = localStorage.getItem('countdownStartTime');
  const savedTotalTime = localStorage.getItem('countdownTotalTime');

  if (savedStartTime && savedTotalTime) {
    const elapsedTime = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
    timeLeft.value = Math.max(0, parseInt(savedTotalTime) - elapsedTime);
  } else {
    localStorage.setItem('countdownStartTime', Date.now().toString());
    localStorage.setItem('countdownTotalTime', totalTime.toString());
  }

  intervalId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1;
    } else {
      clearInterval(intervalId.value);
      alert('Le compte à rebours est terminé!');
    }
  }, 1000);
};

const { user } = useUserSession()

onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
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