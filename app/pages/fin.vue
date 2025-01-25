<template>
  <div class="container">
    <h1 class="title">Fin de partie</h1>
    <span class="score">Votre score est de {{ score }}</span>
    <button class="game-button" @click="navigateTo('/accueil')">
      Revenir à l'accueil
    </button>

    <!-- Tableau pour les score de l'entreprise -->
    <div v-if="scoreBoard && scoreBoard.companyTeams.length > 0">
      <h2 class="sub-title">Classement de votre entreprise</h2>
      <table>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom d'équipe</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in scoreBoard?.companyTeams">
            <td>{{ index + 1 }}</td>
            <td>{{ team.name }}</td>
            <td>{{ team.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau pour les score globaux -->
    <div>
      <h2 class="sub-title">Classement global</h2>
      <table>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom d'équipe</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in scoreBoard?.globalTeams">
            <td>{{ index + 1 }}</td>
            <td>{{ team.name }}</td>
            <td>{{ team.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { timer } from "~/store/timer";

type TeamInfo = {
  name: string;
  score: number;
};

type ScoreBoard = {
  companyTeams: TeamInfo[];
  globalTeams: TeamInfo[];
};

definePageMeta({
  middleware: "auth",
});
const { clear } = useUserSession();

const score = ref<number>();
const scoreBoard = ref<ScoreBoard>();

onMounted(async () => {
  const malus = localStorage.getItem("malus");

  score.value = await $fetch("/api/end", {
    method: "POST",
    body: {
      timer: timer.value,
      malus: malus !== null ? JSON.parse(malus) : 0,
    },
  });

  const response = await $fetch("/api/team", {
    method: "GET",
  });

  scoreBoard.value = {
    companyTeams: response.companyTeams,
    globalTeams: response.globalTeams,
  };

  // localStorage.removeItem("countdownStartTime");
  // localStorage.removeItem("countdownTotalTime");
  // localStorage.removeItem("malus");

  // clear();
});
</script>

<style lang="css" scoped>
table {
  width: 360px;
  border-collapse: collapse;
  font-family: "Cinzel", sans-serif;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: white;
}
th {
  background-color: var(--secondary-color);
  color: white;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
}

.title {
  margin-bottom: 5px;
  font-family: "Cinzel", sans-serif;
  color: var(--secondary-color);
}

.score {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #dfd3b5;
}
.sub-title {
  font-size: 1.5rem;
  color: #dfd3b5;
}
</style>
