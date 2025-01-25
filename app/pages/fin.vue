<template>
  <div class="container">
    <h1 class="title">Fin de partie</h1>
    <span class="score">Votre score est de {{ score }}</span>
    <button class="game-button" @click="navigateTo('/accueil')">
      Revenir à l'accueil
    </button>

    <!-- Premier double tableaux pour les score de l'entreprise -->
    <div>
      <table v-if="scoreBoard && scoreBoard.topCompanyTeams.length > 0">
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom d'équipe</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in scoreBoard?.topCompanyTeams">
            <td>{{ index }}</td>
            <td>{{ team.name }}</td>
            <td>{{ team.score }}</td>
          </tr>
        </tbody>
      </table>

      <table v-if="scoreBoard && scoreBoard.companyTeams.length > 0">
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom d'équipe</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in scoreBoard?.companyTeams">
            <td>{{ index }}</td>
            <td>{{ team.name }}</td>
            <td>{{ team.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Deuxième double tableaux pour les score globaux -->
    <div>
      <table>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom d'équipe</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in scoreBoard?.topGlobalTeams">
            <td>{{ index }}</td>
            <td>{{ team.name }}</td>
            <td>{{ team.score }}</td>
          </tr>
        </tbody>
      </table>

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
            <td>{{ index }}</td>
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
  topCompanyTeams: TeamInfo[];
  companyTeams: TeamInfo[];
  topGlobalTeams: TeamInfo[];
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

  const topCompanyTeams = response.companyTeams.slice(0, 3);
  const topGlobalTeams = response.globalTeams.slice(0, 3);
  const followingCompanyTeams = response.companyTeams.splice(0, 3);
  const followingGlobalTeams = response.globalTeams.splice(0, 3);

  scoreBoard.value = {
    topCompanyTeams,
    companyTeams: followingCompanyTeams,
    topGlobalTeams,
    globalTeams: followingGlobalTeams,
  };

  // localStorage.removeItem("countdownStartTime");
  // localStorage.removeItem("countdownTotalTime");
  // localStorage.removeItem("malus");

  // clear();
});
</script>

<style lang="css" scoped>
table {
  width: 100%;
  border-collapse: collapse;
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
  font-family: "Cinzel", sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
</style>
