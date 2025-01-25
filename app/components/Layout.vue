<template>
  <div>
    <slot />
    <footer v-if="route.name !== 'jeu'" class="footer">
      <div class="footer-content">
        <span>{{ formattedTime }}</span>
        <span>{{ user?.team }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { formattedTime, maxTimer, timer } from "~/store/timer";

const totalTime = maxTimer; // 1 hour in seconds
const intervalId = ref<NodeJS.Timeout>();

const route = useRoute();
const { user } = useUserSession();

function startCountdown() {
  const savedStartTime = localStorage.getItem("countdownStartTime");
  const savedTotalTime = localStorage.getItem("countdownTotalTime");

  if (savedStartTime && savedTotalTime) {
    const elapsedTime = Math.floor(
      (Date.now() - parseInt(savedStartTime)) / 1000
    );
    timer.value = Math.max(0, parseInt(savedTotalTime) - elapsedTime);
  } else {
    localStorage.setItem("countdownStartTime", Date.now().toString());
    localStorage.setItem("countdownTotalTime", totalTime.toString());
  }

  intervalId.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1;
    } else {
      clearInterval(intervalId.value);
      navigateTo("/fin");
    }
  }, 1000);
}

onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>

<style lang="css" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--primary-color);
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  font-size: large;
  font-family: "Cinzel", sans-serif;
  font-weight: 700;
  span {
    color: var(--secondary-color);
  }
}
</style>
