<script setup lang="ts">
import QuestionBlock from "@/components/question-block.vue";
import type { Question } from "~/components/types/qcm";
import type { FormSubmitEvent } from "#ui/types";
import { type QcmResponsesForm, qcmResponses } from "~/composables/useQCMResponses";

const jsonQuestions = await queryContent('/qcm').findOne();
const questions = jsonQuestions.body as unknown as Question[];

definePageMeta({
  middleware: 'auth'
})

const state = reactive({
  response1: 0,
  response2: 0,
  response3: 0
});

const onSubmit = (event: FormSubmitEvent<QcmResponsesForm>) => {
  console.log(event.data);
  navigateTo({
    path: "/qcm-responses",
    query: {
      responses: JSON.stringify(state)
    }
  })
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <UForm :schema="qcmResponses" class="flex flex-col mb-4 gap-5" :state="state" @submit="onSubmit">
      <div v-for="question in questions">
        <QuestionBlock :question="question" :state="state" />
      </div>
      <UButton type="submit" class="w-full text-white font-bold py-2 px-4 rounded text-center">
        Valider
      </UButton>
    </UForm>
  </div>
</template>
