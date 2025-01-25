<template>
  <div class="card" @click="flipCard">
    <div
      class="card-inner"
      :class="{ flipped: isFlipped, expanded: isFlipped }"
    >
      <div class="card-front">
        {{ createCardTitle() }}
      </div>
      <div class="card-back">
        {{ indice.value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Indice, IndiceType } from "~/components/types/enigme";

const titlesMapper: Record<IndiceType, string> = {
  indice_lieu: "Indice lieu",
  solution_lieu: "Solution lieu",
  indice_enigme: "Indice enigme",
  solution_enigme: "Solution enigme",
};

const props = defineProps<{
  indice: Indice;
  canFlip: boolean;
  index: number;
}>();
const isFlipped = ref(props.indice.flipped);

function createCardTitle() {
  return titlesMapper[props.indice.type as IndiceType];
}

async function flipCard() {
  if (props.canFlip && !isFlipped.value) {
    isFlipped.value = true;
    props.indice.flipped = true;

    saveMalus(props.indice.id);
  }
}

async function saveMalus(indiceId: number) {
  const malusString = localStorage.getItem("malus");
  const currentMalus = malusString === null ? {} : JSON.parse(malusString);

  currentMalus[indiceId] = true;

  localStorage.setItem("malus", JSON.stringify(currentMalus));
}

watch(isFlipped, (newVal) => {
  if (newVal) {
    props.indice.flipped = true;
  }
});
</script>

<style scoped lang="css">
.card {
  width: 80%;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 40px;
  transition: transform 0.6s, height 0.6s;
  transform-style: preserve-3d;
}

.card-inner.expanded {
  height: 160px;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  background-color: #f8f8f8;

  font-family: "Tempus", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  color: var(--secondary-color);
}

.card-front {
  font-size: 1.4em;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
