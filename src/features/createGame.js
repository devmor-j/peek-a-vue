import shuffle from 'lodash/shuffle';
import { basicCannon } from '../utilities/confetti';
import { ref, computed, watch } from "vue";

export default function createGame(deck) {
  const isPlaying = ref(false);
  const userSelection = ref([]);
  const userShouldWait = ref(false)


  function restartGame() {
    userSelection.value.length = 0;
    deck.value = shuffle(deck.value);

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        position: index,
        matched: false,
        visible: false,
      }
    })
  }

  function startGame() {
    isPlaying.value = true;

    restartGame();
  }

  const flipCard = (payload) => {
    if (userShouldWait.value || !isPlaying.value) return;
    deck.value[payload.position].visible = true;

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

  const remainingPairs = computed(() => {
    const remainingCards = deck.value.filter(card => card.matched === false).length;

    // divided by two because of pairs
    return remainingCards / 2;
  });

  watch(remainingPairs, (currentValue) => {
    if (currentValue === 0) {
      basicCannon();
    }
  });

  watch(userSelection, (currentValue) => {
    if (currentValue.length === 2) {
      // extract user's two selected cards
      const [cardOne, cardTwo] = currentValue;

      // compare two cards faceValue
      if (cardOne.faceValue === cardTwo.faceValue) {
        deck.value[cardOne.position].matched = true;
        deck.value[cardTwo.position].matched = true;
      } else {
        // when user choices are not matched do not flip new card
        // until setTimeout promise resolves
        userShouldWait.value = true;

        new Promise((res) => setTimeout(() => {
          res();
        }, 500))
          .then(() => {
            deck.value[cardOne.position].visible = false;
            deck.value[cardTwo.position].visible = false;
            userShouldWait.value = false;
          })
      }

      userSelection.value.length = 0;
    }
  }, { deep: true })

  return {
    isPlaying,
    userSelection,
    userShouldWait,
    startGame,
    restartGame,
    flipCard,
    remainingPairs,
  }
}
