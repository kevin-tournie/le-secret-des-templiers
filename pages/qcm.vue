<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="flex flex-col mb-4 gap-5">
      {{ question.question }}
      <div v-for="answer in question.answers" size="sm">
        <UButton
          :variant="userAnswer === answer.id ? 'solid' : 'outline'"
          @click="toggle(answer.id)"
          :id="answer.id"
          class="mb-2 w-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
        >
          {{ answer.value }}
        </UButton>
        {{
          showAnswers && (userAnswer === answer.id || answer.isCorrect)
            ? answer.indication
            : ""
        }}
      </div>
      <UButton
        @click="onSubmit"
        class="w-full text-white font-bold py-2 px-4 rounded text-center"
      >
        {{ showAnswers === true ? "Suivant" : "Valider" }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "~/components/types/qcm";
import type { FormSubmitEvent } from "#ui/types";
import type { QcmResponsesForm } from "~/composables/useQCMResponses";

definePageMeta({
  middleware: "auth",
});

const jsonQuestions = await queryContent("/qcm").findOne();
const questions = jsonQuestions.body as unknown as Question[];

const userAnswer = ref(0);
const showAnswers = ref(false);
const questionNumber = ref(0);
const question = computed(() => questions[questionNumber.value]);

async function onSubmit(event: FormSubmitEvent<QcmResponsesForm>) {
  event.preventDefault();

  if (showAnswers.value && questionNumber.value === 3) {
    await navigateTo("/video");
  }

  if (showAnswers.value) {
    showAnswers.value = false;
    questionNumber.value += 1;
  } else {
    showAnswers.value = true;
  }
}

function toggle(buttonId: number) {
  showAnswers.value = false;
  userAnswer.value = buttonId;
}
</script>
