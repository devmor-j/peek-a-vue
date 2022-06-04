<script>
export default {
  props: {
    isPlaying: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, ctx) {
    function startNewGame() {
      ctx.emit("start-new-game");
    }

    function restartGame() {
      ctx.emit("restart-game");
    }

    return {
      startNewGame,
      restartGame,
    };
  },
};
</script>

<template>
  <button
    v-if="!isPlaying"
    @click="startNewGame"
    class="game-button"
    :class="isPlaying === false ? 'button-anime' : ''"
  >
    <img src="/images/play.svg" alt="" />
    Start New Game
  </button>
  <button v-else @click="restartGame" class="game-button">
    <img src="/images/restart.svg" alt="" />
    Restart Game
  </button>
</template>

<style scoped>
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
</style>
