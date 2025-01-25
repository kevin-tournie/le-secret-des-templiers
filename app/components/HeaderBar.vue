<template>
  <div class="container">
    <img
      class="headerbar-image"
      src="/img/logo.png"
      alt="Le Secret des templiers"
    />
  </div>
</template>

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

.headerbar-image {
  object-fit: contain;
  width: 60%;
  height: 60%;
}
</style>
