<template>
  <div class="vertical-container container">
    <span class="question-title">{{ question?.question }}</span>
    <div v-for="answer in question?.answers" class="answer-container">
      <button
        :class="{
          buttonClicked: userAnswer === answer.id,
        }"
        @click="toggle(answer.id)"
      >
        {{ answer.value }}
      </button>
      <span
        :class="{ isCorrect: answer.isCorrect, isIncorrect: !answer.isCorrect }"
      >
        {{
          showAnswers && (userAnswer === answer.id || answer.isCorrect)
            ? answer.indication
            : ""
        }}</span
      >
    </div>
    <button @click="onSubmit" class="game-button">
      {{
        showAnswers === true && questionNumber === 3
          ? "Commencer la partie"
          : showAnswers === true
          ? "Suivant"
          : "Valider"
      }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "~/components/types/qcm";
import jsonQuestions from "~/assets/json/qcm.json";

definePageMeta({
  middleware: "auth",
});

const questions = jsonQuestions.body as unknown as Question[];

const userAnswer = ref();
const showAnswers = ref(false);
const questionNumber = ref(0);
const question = computed(() => questions[questionNumber.value]);

async function onSubmit(event: any) {
  event.preventDefault();
  if (!userAnswer.value) {
    return;
  }

  if (showAnswers.value && questionNumber.value === 3) {
    await navigateTo("/jeu");
  }

  if (showAnswers.value) {
    showAnswers.value = false;
    questionNumber.value += 1;
    userAnswer.value = null;
  } else {
    showAnswers.value = true;
  }
}

function toggle(buttonId: number) {
  showAnswers.value = false;
  userAnswer.value = buttonId;
}
</script>

<style lang="scss" scoped>
.container {
  gap: 20px;
}
.question-title {
  color: var(--secondary-color);
  font-weight: 600;
  margin-bottom: 20px;
  font-family: "Cinzel", sans-serif;
  text-align: center;
  width: 80%;
}
.answer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;

  & > * {
    font-family: "Cinzel", sans-serif;
  }

  span {
    text-align: center;
    font-weight: 700;
  }
  button {
    margin-bottom: 5px;
  }
}
.buttonClicked {
  color: var(--secondary-color);
}
.isCorrect {
  color: rgb(20, 141, 20);
}
.isIncorrect {
  color: rgb(221, 25, 25);
}
</style>
