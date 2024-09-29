<template>
  <div class="indices-container">
    <FlippableCard
      v-for="(indice, index) in indices"
      :key="indice.id"
      :indice="indice"
      :canFlip="canFlip(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FlippableCard from "~/components/FlippableCard.vue";
import type { Enigme, Indice } from "~/components/types/enigme";

const indices = ref<Indice[]>([]);

const route = useRoute();
const router = useRouter();

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
    router.back();
  }
});

const canFlip = (index: number) => {
  if (index === 0) return true;
  return indices.value[index - 1].flipped;
};
</script>
