<template>
  <Layout>
    <div class="question-container">
      <p>Quel dernier templier avez-vous rencontré ?</p>
      <form @submit.prevent="handleClick">
        <input
          type="text"
          v-model="templierName"
          placeholder="Entrez le nom du templier"
        />
        <button type="submit">Valider</button>
        <NuxtLink to="/jeu">Retour</NuxtLink>
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
</style>
