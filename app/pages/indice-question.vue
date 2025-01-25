<template>
  <Layout>
    <div class="question-container">
      <p>Comment s'appelait le dernier templier que avez-vous rencontré ?</p>
      <form @submit.prevent="handleClick">
        <input
          type="text"
          v-model="templierName"
          placeholder="Entrez le nom du templier"
        />
        <button class="game-button" type="submit">Valider</button>
        <button class="game-button" @click="handleReturnClick">Retour</button>
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: "auth",
});

const templierName = ref("");

async function handleClick() {
  await navigateTo({
    name: "enigmes",
    query: { templier: templierName.value },
  });
}

async function handleReturnClick() {
  await navigateTo("/jeu");
}
</script>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  height: 80vh;
  margin-top: 50px;
}

.question-container p {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #dfd3b5;
  font-family: "Cinzel", sans-serif;
  font-weight: 600;
}

.question-container form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.question-container input {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 10px;
  width: 300px;

  font-family: "Tempus", sans-serif;
}
</style>
