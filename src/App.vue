<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
  </section>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  border: 5px solid #ccc
}

.game-board {
  display: grid;
  /* [ ] avoid pixels in css (use rem) */
  grid-template-columns: repeat(4, 100px);
  grid-auto-rows: 100px;
  gap: 30px;
  justify-content: center;
}
</style>
