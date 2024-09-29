<template>
  <div class="question-container">
    <p>Quel dernier templier avez-vous rencontré ?</p>
    <form @submit.prevent="handleClick">
      <UInput
        type="text"
        v-model="templierName"
        placeholder="Entrez le nom du templier"
      />
      <UButton type="submit">Valider</UButton>
    </form>
  </div>
  <footer class="footer">
    <div class="footer-content">
      <span>{{ formattedTime }}</span>
      <span>{{ user.team }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const templierName = ref("");

const totalTime = 3600; // 1 hour in seconds
const timeLeft = ref(totalTime);
const intervalId = ref<number | null>(null);

const formattedTime = computed(() => {
  const hours = Math.floor(timeLeft.value / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timeLeft.value % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft.value % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
});

const startCountdown = () => {
  const savedStartTime = localStorage.getItem("countdownStartTime");
  const savedTotalTime = localStorage.getItem("countdownTotalTime");

  if (savedStartTime && savedTotalTime) {
    const elapsedTime = Math.floor(
      (Date.now() - parseInt(savedStartTime)) / 1000
    );
    timeLeft.value = Math.max(0, parseInt(savedTotalTime) - elapsedTime);
  } else {
    localStorage.setItem("countdownStartTime", Date.now().toString());
    localStorage.setItem("countdownTotalTime", totalTime.toString());
  }

  intervalId.value = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1;
    } else {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
      }
      alert("Le compte à rebours est terminé!");
    }
  }, 1000);
};

const { user } = useUserSession();
const router = useRouter();

onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});

function handleClick() {
  router.push({
    name: "enigmes",
    query: { templier: templierName.value },
  });
}
</script>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin-top: 50px;
}

.question-container p {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
}

.question-container input {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f8f8f8;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  font-size: 1.2em;
}
</style>
