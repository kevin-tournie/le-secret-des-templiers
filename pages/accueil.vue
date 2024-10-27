<template>
  <div class="vertical-container">
    <form @submit="onSubmit" class="container-form">
      <div class="container-group-form">
        <label for="team" class="label-form">Nom d'équipe</label>
        <input name="team" v-model="form.teamName" class="input-form" />
      </div>

      <div class="container-group-form">
        <label for="company" class="label-form"
          >Nom d'entreprise (facultatif)</label
        >
        <input name="company" v-model="form.companyName" class="input-form" />
      </div>
      <button type="submit" class="button-form">Jouer</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { fetch } = useUserSession();

const form = reactive({
  teamName: "",
  companyName: "",
});

async function onSubmit(event: any) {
  event.preventDefault();
  console.log(event);
  await useCreateTeam({
    teamName: form.teamName,
    companyName: form.companyName,
  });

  await fetch(); // permet de récupérer le cookie de session !!

  await navigateTo("/qcm");
}
</script>

<style lang="scss" scoped>
.container-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 600px);
  gap: 10px;
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

.button-form {
  margin-top: 20px;
  height: 50px;
  width: 100px;
  align-self: center;
  background-color: var(--secondary-color);
  border: white;

  font-size: large;
  font-family: "Cinzel", sans-serif;
  color: white;
  box-shadow: 0 4px 20px rgba(176, 146, 72, 0.5);

  &:active {
    box-shadow: 0 2px 10px rgba(176, 146, 72, 0.7);
  }
}
</style>
