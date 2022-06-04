<script>
import { onMounted } from "vue";
import GameCard from "@/components/GameCard";
import GameButton from "@/components/GameButton";
import GameTitle from "@/components/GameTitle";
import createDeck from "./features/createDeck";
import createGame from "./features/createGame";
import { halloweenDeck } from "./data/halloweenDeck.json";

// [ ] show how many choices player has made
// minimum total choices must be 4*4=16

// [ ] when player choices surpass a certain number like 10
// and all choices were unsuccessful then show a card hint to player

export default {
  name: "App",
  components: {
    GameCard,
    GameButton,
    GameTitle,
  },

  setup() {
    const { cardList } = createDeck(halloweenDeck);
    const {
      isPlaying,
      playerSelection,
      startNewGame,
      restartGame,
      remainingPairs,
      playerShouldWait,
      flipCard,
    } = createGame(cardList);

    onMounted(() => {
      cardList.value = cardList.value.map((card) => {
        return {
          ...card,
          // make visible half of the cards
          visible: card.variant === 1 ? true : false,
        };
      });
    });

    return {
      cardList,
      flipCard,
      playerSelection,
      restartGame,
      remainingPairs,
      isPlaying,
      startNewGame,
      playerShouldWait,
    };
  },
};
</script>

<template>
  <GameTitle />

  <TransitionGroup tag="section" name="shuffle-transition" class="game-board">
    <GameCard
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      @select-card="flipCard"
    />
  </TransitionGroup>

  <GameButton
    :isPlaying="isPlaying"
    @start-new-game="startNewGame"
    @restart-game="restartGame"
  />

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
  padding-inline: 1rem;
}

.game-board {
  --game-card-size: clamp(4rem, 2rem + 12vw, 7rem);
  display: grid;
  grid-template-columns: repeat(4, var(--game-card-size));
  grid-auto-rows: var(--game-card-size);
  gap: clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem);
  justify-content: center;
  padding-block: 2rem;
}

.shuffle-transition {
  transition: transform 1s ease-in;
}
</style>
