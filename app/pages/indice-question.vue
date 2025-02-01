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
    <Transition name="fade">
      <div v-if="showError" class="dialog-overlay" @click="showError = false">
        <div class="dialog-box" @click.stop>
          <p>Ce templier n'existe pas !</p>
          <button class="game-button" @click="showError = false">Fermer</button>
        </div>
      </div>
    </Transition>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Enigme } from "~/components/types/enigme";
import jsonEnigmes from "~/assets/json/enigmes.json";

definePageMeta({
  middleware: "auth",
});

const templierName = ref("");
const showError = ref(false);

async function handleClick(e: Event) {
  e.preventDefault();
  if (!templierName.value) {
    return;
  }
  const enigmes = jsonEnigmes.body as unknown as Enigme[];
  if (!enigmes.some((enigme) => enigme.templier === templierName.value)) {
    showError.value = true;
    return;
  }
  await navigateTo({
    name: "enigmes",
    query: { templier: templierName.value },
  });
}

async function handleReturnClick(e: Event) {
  e.preventDefault();
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

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.dialog-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: 2px solid #dfd3b5;
  max-width: 70%;
  width: 400px;
}

.dialog-box p {
  color: #dc3545;
  font-family: "Tempus", sans-serif;
  margin-bottom: 20px;
  font-size: 1.2em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
