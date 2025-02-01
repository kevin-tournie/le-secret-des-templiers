<template>
  <Transition name="fade">
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-box" @click.stop>
        <h2>Entrez le mot de passe</h2>
        <div class="password-display">
          {{ selectedLetters.join("") || "________" }}
        </div>

        <div class="letter-grid">
          <button
            v-for="letter in shuffledLetters"
            :key="letter"
            @click="selectLetter(letter)"
            class="letter-button"
            :disabled="selectedLetters.length >= 9"
          >
            {{ letter }}
          </button>
        </div>

        <div class="dialog-buttons">
          <button class="game-button" @click="clearLetters">Effacer</button>
          <button class="game-button" @click="validatePassword">Valider</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  showDialog: boolean;
}>();

const emit = defineEmits<{
  "update:showDialog": [value: boolean];
}>();

function closeDialog() {
  emit("update:showDialog", false);
  clearLetters();
}

const selectedLetters = ref<string[]>([]);
const letters = ["c", "a", "m", "p", "n", "i", "e", "b", "d", "f", "g", "h"];

const shuffledLetters = computed(() => {
  return [...letters].sort(() => Math.random() - 0.5);
});

function selectLetter(letter: string) {
  if (selectedLetters.value.length < 9) {
    selectedLetters.value.push(letter);
  }
}

function clearLetters(e?: Event) {
  e?.preventDefault();
  selectedLetters.value = [];
}

async function validatePassword(e: Event) {
  e.preventDefault();
  if (selectedLetters.value.join("") === "campaniae") {
    await navigateTo({
      name: "fin",
      query: { endgame_password: "campaniae" },
    });
  } else {
    clearLetters();
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-box {
  background-color: white;
  border: 2px solid #b09248;
  border-radius: 8px;
  padding: 2rem;
  font-family: "Tempus", sans-serif;
  color: #b09248;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.password-display {
  font-family: monospace;
  font-size: 2rem;
  margin: 1rem 0;
  letter-spacing: 4px;
}

.letter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-family: "Tempus", sans-serif;
  gap: 10px;
  margin: 20px 0;
}

.letter-button {
  background-color: #b09248;
  border: none;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-family: "Tempus", sans-serif;
  text-transform: uppercase;
  transition: opacity 0.3s;
}

.letter-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dialog-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
