<template>
  <h1 class="visually-hidden">Peek-a-Vue</h1>
  <img src="../public/images/peek-a-vue-title.png" alt="Peek a vue">

  <TransitionGroup tag="section" name="shuffle-transition" class="game-board">
    <GameCard v-for="card in cardList" :key="`${card.value}-${card.variant}`" :value="card.value" :visible="card.visible" :position="card.position" :matched="card.matched" @select-card="flipCard" />
  </TransitionGroup>

  <h2>{{ status }}</h2>
  <button @click="restartGame" class="restart-game">
    <img src="../public/images/restart.svg" alt="">
    Restart game
  </button>
  <!-- [ ] use waiting time as game level so lower waiting times are harder -->
  <!-- <input type="range" step="50" min="0" max="1000"> -->
</template>

<script>
import shuffle from 'lodash/shuffle';
import { basicCannon } from './utilities/confetti';
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
    const userShouldWait = ref(false)

    const status = computed(() => {
      let statusMessage;
      if (remainingPairs.value === 0) {
        statusMessage = 'Player wins!'
        basicCannon();
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

    const cardItems = ['bat', 'candy', 'cauldron', 'cupcake', 'ghost', 'moon', 'pumpkin', 'witch-hat'];

    cardItems.forEach((item, index) => {
      cardList.value.push({
        value: item,
        variant: 1,
        visible: false,
        position: (2 * index),
        matched: false,
      });

      // second item of the pair
      cardList.value.push({
        value: item,
        variant: 2,
        visible: false,
        position: (2 * index) + 1,
        matched: false,
      });
    })

    const flipCard = (payload) => {
      if (userShouldWait.value) return;
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
          // when user choices are not matched do not flip new card
          // until setTimeout promise resolves
          userShouldWait.value = true;

          new Promise((res) => setTimeout(() => {
            res();
          }, 500))
            .then(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
              userShouldWait.value = false;
            })
        }

        userSelection.value.length = 0;
      }
    }, { deep: true })

    function restartGame() {
      userSelection.value.length = 0;
      cardList.value = shuffle(cardList.value);

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
      restartGame,
    };
  }

}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/public/images/page-bg.png");
  background-color: #00060c;
  color: white;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 7rem);
  grid-auto-rows: 7rem;
  gap: 1.25rem;
  justify-content: center;
  padding-top: 2rem;
}

.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.restart-game {
  padding: 0.75rem 0.875rem;
  font-size: 1rem;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  transition-duration: 0.3s;
  transition-property: color, background-color;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  cursor: pointer;
}

.restart-game:hover {
  background-color: orange;
  color: black;
}

.restart-game:active {
  background-color: white;
}

.restart-game:focus-visible:not(:active) {
  background-color: orangered;
}

.shuffle-transition {
  transition: transform 1s ease-in;
}
</style>
