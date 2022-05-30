<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <GameCard v-for="(card, index) in cardList" :key="`GameCard-${index}`" :value="card.value" :visible="card.visible" :position="card.position" :matched="card.matched" @select-card="flipCard" />
  </section>
  <h2>{{ status }}</h2>
  <button @click="restartGame">Restart game</button>
</template>

<script>
import shuffle from 'lodash/shuffle';
import { ref, watch, computed } from 'vue';
import GameCard from "@/components/GameCard"

export default {
  name: 'App',
  components: {
    GameCard,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);

    const status = computed(() => {
      let statusMessage;
      if (remainingPairs.value === 0) {
        statusMessage = 'Player wins!'
      } else {
        statusMessage = `Remaining pairs: ${remainingPairs.value}`
      }

      return statusMessage;
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(card => card.matched === false).length;

      // divided by two because of pairs
      return remainingCards / 2;
    });

    const cardItems = [1, 2, 3, 4, 5, 6, 7, 8];

    cardItems.forEach((item, index) => {
      cardList.value.push({
        value: item,
        visible: false,
        position: (2 * index),
        matched: false,
      });

      // second item of the pair
      cardList.value.push({
        value: item,
        visible: false,
        position: (2 * index) + 1,
        matched: false,
      });
    })

    const flipCard = (payload) => {
      console.log(payload)
      cardList.value[payload.position].visible = true;

      // if user has selected one card add next selection
      if (userSelection.value[0] ?? false) {
        // fix a bug that allows to pair a card with itself
        if (userSelection.value[0].position === payload.position) {
          return
        } else {
          // set the last (2/2) card to user's choices
          userSelection.value[1] = payload;
        }
      } else {
        // set the first (1/2) card to user's choices
        userSelection.value[0] = payload;
      }
    }

    watch(userSelection, (currentValue) => {
      if (currentValue.length === 2) {
        // extract user's two selected cards
        const [cardOne, cardTwo] = currentValue;

        // compare two cards faceValue
        if (cardOne.faceValue === cardTwo.faceValue) {
          cardList.value[cardOne.position].matched = true;
          cardList.value[cardTwo.position].matched = true;
        } else {
          setTimeout(() => {
            cardList.value[cardOne.position].visible = false;
            cardList.value[cardTwo.position].visible = false;
          }, 1000)
        }

        userSelection.value.length = 0;
      }
    }, { deep: true })

    function shuffleCards() {
      cardList.value = shuffle(cardList.value);
    }

    function restartGame() {
      shuffleCards();

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          position: index,
          matched: false,
          visible: false,
        }
      })
    }

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      shuffleCards,
      restartGame,
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
