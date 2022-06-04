import shuffle from "lodash/shuffle";
import { basicCannon } from "../utilities/confetti";
import { ref, computed, watch } from "vue";

export default function createGame(deck) {
  const isPlaying = ref(false);
  const playerSelection = ref([]);
  const playerShouldWait = ref(false);

  function restartGame() {
    playerSelection.value.length = 0;
    deck.value = shuffle(deck.value);

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        position: index,
        matched: false,
        visible: false,
      };
    });
  }

  function startNewGame() {
    isPlaying.value = true;

    restartGame();
  }

  const flipCard = (payload) => {
    if (playerShouldWait.value || !isPlaying.value) return;
    deck.value[payload.position].visible = true;

    // if player has selected one card add next selection
    if (playerSelection.value[0] ?? false) {
      // fix a bug that allows to pair a card with itself
      if (playerSelection.value[0].position === payload.position) {
        return;
      } else {
        // set the last (2/2) card to player's choices
        playerSelection.value[1] = payload;
      }
    } else {
      // set the first (1/2) card to player's choices
      playerSelection.value[0] = payload;
    }
  };

  const remainingPairs = computed(() => {
    const remainingCards = deck.value.filter(
      (card) => card.matched === false
    ).length;

    // divided by two because of pairs
    return remainingCards / 2;
  });

  watch(remainingPairs, (currentValue) => {
    if (currentValue === 0) {
      basicCannon();
      isPlaying.value = false;
    }
  });

  watch(
    playerSelection,
    (currentValue) => {
      if (currentValue.length === 2) {
        // extract player's two selected cards
        const [cardOne, cardTwo] = currentValue;

        // compare two cards faceValue
        if (cardOne.faceValue === cardTwo.faceValue) {
          deck.value[cardOne.position].matched = true;
          deck.value[cardTwo.position].matched = true;
        } else {
          // when player choices are not matched do not flip new card
          // until setTimeout promise resolves
          playerShouldWait.value = true;

          const waitForTimer = new Promise((res) =>
            setTimeout(() => {
              res();
            }, 500)
          );

          waitForTimer.then(() => {
            deck.value[cardOne.position].visible = false;
            deck.value[cardTwo.position].visible = false;
            playerShouldWait.value = false;
          });
        }

        playerSelection.value.length = 0;
      }
    },
    { deep: true }
  );

  return {
    isPlaying,
    playerSelection,
    playerShouldWait,
    startNewGame,
    restartGame,
    flipCard,
    remainingPairs,
  };
}
