import { ref } from "vue";

const cardList = ref([]);

const initDeck = (deckData) => {
  deckData.forEach((item, index) => {
    cardList.value.push({
      value: item,
      variant: 1,
      visible: false,
      position: 2 * index,
      matched: false,
    });

    // second item of the pair
    cardList.value.push({
      value: item,
      variant: 2,
      visible: false,
      position: 2 * index + 1,
      matched: false,
    });
  });
};

export default function createDeck(deckData) {
  initDeck(deckData);

  return {
    cardList,
  };
}
