<template>
  <div class="vertical-container">
    <form @submit="onSubmit" class="container-form">
      <div class="container-group-form">
        <label for="team" class="label-form">Nom d'équipe</label>
        <input
          name="team"
          v-model="form.teamName"
          class="input-form"
          @input="() => (errorMessage = '')"
        />
        <span class="error">{{ errorMessage }}</span>
      </div>

      <div class="container-group-form">
        <label for="company" class="label-form"
          >Nom d'entreprise (facultatif)</label
        >
        <input name="company" v-model="form.companyName" class="input-form" />
      </div>
      <button type="submit" class="game-button">Jouer</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from "ofetch";

const { fetch } = useUserSession();

const form = reactive({
  teamName: "",
  companyName: "",
});
const errorMessage = ref("");

async function onSubmit(event: any) {
  event.preventDefault();

  try {
    await useCreateTeam({
      teamName: form.teamName,
      companyName: form.companyName,
    });

    await fetch(); // permet de récupérer le cookie de session !!

    await navigateTo("/video");
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.response?.status === 409) {
        errorMessage.value = "Ce nom d'équipe est déjà pris";
      } else {
        errorMessage.value = "Une erreur est survenue";
      }
    } else {
      errorMessage.value = "Une erreur inattendue est survenue";
    }
  }
}
</script>

<style lang="scss" scoped>
.container-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 600px);
  gap: 25px;
}

.container-group-form {
  display: flex;
  flex-direction: column;
}

.label-form {
  color: var(--secondary-color);
  font-family: "Cinzel", sans-serif;
  font-weight: 600;
}

.input-form {
  font-family: "Cinzel", sans-serif;
  border: 2px solid;
  border-color: white;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--secondary-color);
  }
}
.error {
  color: #c55047;
  font-family: "Tempus", sans-serif;
  font-weight: 600;
}
</style>
