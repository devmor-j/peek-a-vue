<script>
import { onMounted } from 'vue';
import GameCard from "@/components/GameCard"
import createDeck from './features/createDeck';
import createGame from './features/createGame';
import { halloweenDeck } from './data/halloweenDeck.json'

// [ ] show how many choices player has made
// minimum total choices must be 4*4=16

// [ ] when player choices surpass a certain number like 10
// and all choices were unsuccessful then show a card hint to player

export default {
  name: 'App',
  components: {
    GameCard,
  },

  setup() {

    const { cardList } = createDeck(halloweenDeck);
    const { isPlaying, userSelection, startGame, restartGame, remainingPairs, userShouldWait, flipCard } = createGame(cardList);

    onMounted(() => {
      cardList.value = cardList.value.map((card) => {
        return {
          ...card,
          // make visible half of the cards
          visible: card.variant === 1 ? true : false,
        }
      })
    })

    return {
      cardList,
      flipCard,
      userSelection,
      restartGame,
      remainingPairs,
      isPlaying,
      startGame,
      userShouldWait,
    };
  }

}
</script>

<template>
  <h1 class="visually-hidden">Peek-a-Vue</h1>
  <img src="../public/images/peek-a-vue-title.png" alt="Peek a vue">

  <TransitionGroup tag="section" name="shuffle-transition" class="game-board">
    <GameCard v-for="card in cardList" :key="`${card.value}-${card.variant}`" :value="card.value" :visible="card.visible" :position="card.position" :matched="card.matched" @select-card="flipCard" />
  </TransitionGroup>

  <button v-if="!isPlaying" @click="startGame" class="game-button play-button" :class="isPlaying === false ? 'button-anime' : ''">
    <img src="../public/images/play.svg" alt="">
    Start game
  </button>
  <button v-else @click="restartGame" class="game-button" :class="remainingPairs === 0 ? 'button-anime' : ''">
    <img src="../public/images/restart.svg" alt="">
    Restart game
  </button>
  <!-- [ ] use waiting time as game level so lower waiting times are harder -->
  <!-- <input type="range" step="50" min="0" max="1000"> -->
</template>

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
  padding-block: 2rem;
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

.game-button {
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

.game-button:hover {
  background-color: orange;
  color: black;
}

.game-button:active {
  background-color: white;
}

.game-button:focus-visible:not(:active) {
  background-color: orangered;
}

.game-button.button-anime:not(:hover) {
  animation: button-anime 2s 10 alternate ease-in-out;
}

@keyframes button-anime {
  0% {
    background-color: transparent;
  }

  100% {
    background-color: green;
  }
}

.shuffle-transition {
  transition: transform 1s ease-in;
}
</style>
