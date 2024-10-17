<template>
  <div class="flex flex-col w-full justify-center items-center">
    <h1>Fin de partie</h1>
    <span>Votre score est de {{ score }}</span>
    <UButton @click="navigateTo('/accueil')">Revenir à l'accueil</UButton>

    <!-- Premier double tableaux pour les score de l'entreprise -->
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
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

    <!-- Deuxième double tableaux pour les score globaux -->
    <div>
      <table></table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { timer } from "~/store/timer";

type ScoreBoard = {
  companyTeams: {
    name: string;
    score: number;
  }[];
  globalTeams: {
    name: string;
    score: number;
  }[];
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

  scoreBoard.value = await $fetch("/api/team", {
    method: "GET",
  });

  localStorage.removeItem("countdownStartTime");
  localStorage.removeItem("countdownTotalTime");
  localStorage.removeItem("malus");

  clear();
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
}
th {
  background-color: #f2f2f2;
}
</style>
