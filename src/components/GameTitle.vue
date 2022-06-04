<script>
export default {};
</script>

<template>
  <h1 class="visually-hidden">Peek-a-Vue</h1>
  <img
    class="title-image"
    src="/images/peek-a-vue-title.png"
    alt="Peek a vue"
  />
</template>

<style scoped>
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.title-image {
  max-width: 100%;
}

@media (max-width: 40rem) {
  .title-image {
    width: clamp(10rem, 5rem + 30vw, 30rem);
  }
}
</style>
