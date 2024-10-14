<template>
  <Layout>
    <div class="indices-container">
      <FlippableCard
        v-for="(indice, index) in indices"
        :key="indice.id"
        :indice="indice"
        :canFlip="canFlip(index)"
      />
      <NuxtLink to="jeu">Retour</NuxtLink>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FlippableCard from "~/components/FlippableCard.vue";
import type { Enigme, Indice } from "~/components/types/enigme";

definePageMeta({
  middleware: "auth",
});

const indices = ref<Indice[]>([]);

const route = useRoute();

onMounted(async () => {
  const jsonEnigmes = await queryContent("/enigmes").findOne();
  const enigmes = jsonEnigmes.body as unknown as Enigme[];

  const enigme = enigmes.find(
    (enigme) => enigme.templier === route.query.templier
  );

  if (enigme) {
    indices.value = enigme.indices.map((indice) => ({
      ...indice,
      flipped: false,
    }));
  } else {
    navigateTo("/jeu");
  }
});

const canFlip = (index: number) => {
  if (index === 0) return true;
  return indices.value[index - 1].flipped;
};
</script>
