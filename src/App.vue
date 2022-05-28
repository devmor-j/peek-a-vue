<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <GameCard v-for="(card, index) in cardList" :key="`GameCard-${index}`" :value="card.value" :visible="card.visible" :position="card.position" :matched="card.matched" @select-card="flipCard" />
  </section>
  <h2>{{ status }}</h2>
</template>

<script>
import { ref, watch } from 'vue';
import GameCard from "@/components/GameCard"

export default {
  name: 'App',
  components: {
    GameCard,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);
    const status = ref('');

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i,
        matched: false,
      });
    }

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;

      // if user has selected one card add next selection
      if (userSelection.value[0] ?? false) {
        userSelection.value[1] = payload;
      } else {
        userSelection.value[0] = payload;
      }
    }

    watch(userSelection, (currentValue) => {
      if (currentValue.length === 2) {
        // extract user's two selected cards
        const [cardOne, cardTwo] = currentValue;

        // compare two cards faceValue
        if (cardOne.faceValue === cardTwo.faceValue) {
          status.value = 'Match!';

          cardList.value[cardOne.position].matched = true;
          cardList.value[cardTwo.position].matched = true;
        } else {
          status.value = 'Mismatch!';

          cardList.value[cardOne.position].visible = false;
          cardList.value[cardTwo.position].visible = false;
        }



        userSelection.value.length = 0;
      }
    }, { deep: true })


    return {
      cardList,
      flipCard,
      userSelection,
      status,
    };
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
