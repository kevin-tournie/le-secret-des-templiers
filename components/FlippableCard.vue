<template>
  <div class="card" @click="flipCard">
    <div class="card-inner" :class="{ flipped: isFlipped }">
      <div class="card-front">
        {{ indice.id % 3 === 0 ? "Solution" : `Indice ${indice.id}` }}
      </div>
      <div class="card-back">
        {{ indice.value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Indice } from "~/components/types/enigme";

const props = defineProps<{
  indice: Indice;
  canFlip: boolean;
  index: number;
}>();
const isFlipped = ref(props.indice.flipped);

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
  width: 200px;
  height: 250px;
  perspective: 1000px;
  cursor: pointer;
  margin-bottom: 20px;
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.card-front {
  background-color: #3498db;
  color: white;
}

.card-back {
  background-color: #f8f8f8;
  color: black;
  transform: rotateY(180deg);
}
</style>
