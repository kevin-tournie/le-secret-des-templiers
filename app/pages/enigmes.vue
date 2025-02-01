<template>
  <Layout>
    <div class="page-container">
      <div class="indices-container">
        <FlippableCard
          v-for="(indice, index) in indices"
          :key="indice.id"
          :index="index"
          :indice="indice"
          :canFlip="canFlip(index)"
        />
        <button class="game-button" @click="handleClick">Retour</button>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FlippableCard from "~/components/FlippableCard.vue";
import type { Enigme, Indice } from "~/components/types/enigme";
import jsonEnigmes from "~/assets/json/enigmes.json";

definePageMeta({
  middleware: "auth",
});

const indices = ref<Indice[]>([]);

const route = useRoute();

onMounted(async () => {
  const enigmes = jsonEnigmes.body as unknown as Enigme[];

  const enigme = enigmes.find(
    (enigme) => enigme.templier === route.query.templier
  );

  if (enigme) {
    // récupérer dans le localStorage les valeurs pour chaque indice
    const malus = localStorage.getItem("malus");

    indices.value = enigme.indices.map((indice) => ({
      ...indice,
      flipped: isCardFlipped(malus, indice.id),
    }));
  } else {
    await navigateTo("/jeu");
  }
});

function isCardFlipped(malus: string | null, id: number) {
  if (malus === null) {
    return false;
  }
  const jsonMalus = JSON.parse(malus);
  return jsonMalus[id] ?? false;
}

function canFlip(index: number) {
  if (index === 0) return true;
  return indices.value[index - 1]?.flipped || false;
}

async function handleClick() {
  await navigateTo("/jeu");
}
</script>

<style scoped lang="css">
.page-container {
  height: 100%;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
}

.indices-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  overflow-y: auto;
}
</style>
