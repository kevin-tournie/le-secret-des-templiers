<script setup lang="ts">
import type { QcmResponsesForm } from '~/composables/useQCMResponses';
import type { Question } from './types/qcm';

const props = defineProps<{ question: Question, state: QcmResponsesForm }>()

const userAnswer = ref(0);
const formGroupName = "response" + props.question.id;

const toggle = (buttonId: number) => {
  userAnswer.value = buttonId;
  props.state[formGroupName as 'response1' | 'response2' | 'response3'] = buttonId;
}
</script>

<template>
  <UFormGroup :name="formGroupName">
    <template #label>
      {{ props.question.question }}
    </template>
    <UButton :variant="userAnswer === answer.id ? 'solid' : 'outline'" @click="toggle(answer.id)" :id="answer.id"
      v-for="answer in props.question.answers" size="sm"
      class="mb-2 w-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm">
      {{ answer.value }}
    </UButton>
  </UFormGroup>
</template>
