<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h1 class="text-xl font-bold mb-4 text-center">
        <!-- Adjusted width here -->
        Le secret des Templiers
      </h1>
      <UForm
        :schema="createTeamSchema"
        :state="state"
        class="flex flex-col mb-4 gap-5"
        @submit="onSubmit"
      >
        <UFormGroup label="Nom d'équipe" name="teamName">
          <UInput
            v-model="state.teamName"
            size="sm"
            class="w-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
          </UInput>
        </UFormGroup>

        <UFormGroup label="Nom de l'entreprise (Facultatif)" name="companyName">
          <UInput
            v-model="state.companyName"
            size="sm"
            class="w-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
          >
          </UInput>
        </UFormGroup>
        <UButton
          type="submit"
          class="w-full text-white font-bold py-2 px-4 rounded text-center"
          >Créer une équipe
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import type { CreateTeamForm } from "~/composables/useCreateTeam";

const { fetch } = useUserSession();

const state = reactive({
  teamName: "",
  companyName: "",
});

async function onSubmit(event: FormSubmitEvent<CreateTeamForm>) {
  await useCreateTeam({
    teamName: event.data.teamName,
    companyName: event.data.companyName,
  });

  await fetch();

  await navigateTo("/qcm");
}
</script>
