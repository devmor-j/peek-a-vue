import { ref } from "vue";

const cardList = ref([]);

const cardItems = ['bat', 'candy', 'cauldron', 'cupcake', 'ghost', 'moon', 'pumpkin', 'witch-hat'];

const initDeck = (deckData) => {
  deckData.forEach((item, index) => {
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
}

export default function createDeck() {
  initDeck(cardItems);

  return {
    cardList,
  }
}
