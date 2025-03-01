<template>
  <div class="container">
    <img
      :class="{ headerbarImageHome: isHome, headerbarImage: !isHome }"
      class="headerbar-image"
      src="/img/logo.png"
      alt="Le Secret des templiers"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const isHome = ref();

watch(
  () => route.path,
  () => {
    isHome.value = route.path === "/accueil";
  }
);
</script>

<style lang="css" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  max-width: 300px;
  background-color: var(--primary-color);
}

.headerbarImageHome {
  object-fit: contain;
}
.headerbarImage {
  object-fit: contain;
  width: 85%;
  height: 80%;
}
</style>
