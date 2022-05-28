<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <GameCard v-for="(card, index) in cardList" :key="`GameCard-${index}`" :value="card" />
  </section>
</template>

<script>
import GameCard from "@/components/GameCard"

export default {
  name: 'App',
  components: {
    GameCard,
  },
  setup() {
    let cardList = [];

    for (let i = 0; i < 16; i++) {
      cardList.push(i);
    }

    return { cardList };
  }

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

.game-board {
  display: grid;
  /* [ ] avoid pixels in css (use rem) */
  grid-template-columns: repeat(4, 100px);
  grid-auto-rows: 100px;
  gap: 30px;
  justify-content: center;
}
</style>
