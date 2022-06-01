<script>
import { computed } from "vue";

export default {
  props: {
    matched: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    // [ ] refactor value prop to faceValue
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const flippedStyles = computed(() => {
      if (props.visible) {
        return "is-flipped";
      } else return "";
    });

    const selectCard = () => {
      if (props.matched) return;
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };

    return {
      selectCard,
      flippedStyles,
    };
  },
};
</script>

<template>
  <div
    class="card"
    :class="flippedStyles"
    @click="selectCard"
    :style="{ cursor: matched ? 'not-allowed' : 'pointer' }"
  >
    <div
      v-if="visible"
      class="card-face is-front"
      :class="{ 'already-matched': matched }"
    >
      <img :src="`/images/${value}.png`" :alt="value" draggable="false" />
      <img
        v-if="matched"
        class="icon-checkmark"
        src="/images/checkmark.svg"
        alt=""
        draggable="false"
      />
    </div>

    <div v-else class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  position: relative;
  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1.125);
}

.card.is-flipped {
  transform: rotateY(180deg) scaleX(-1);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.card-face {
  transition-duration: 0.2s;
  transition-property: transform;
  transform: scale(1);
}

.card-face:hover {
  transform: scale(0.95);
}

.card-face:active {
  transform: scale(0.9);
}

.card-face.is-front {
  background-image: url("/public/images/card-bg.png");
  color: white;
}

.card-face.is-back {
  background-image: url("/public/images/card-bg-empty.png");
  color: white;
}

.icon-checkmark {
  position: absolute;
  transform: scale(0.8);
  opacity: 0.8;
  bottom: 0.2rem;
  right: 0.2rem;
}

.already-matched {
  transition-duration: 0.2s;
  transition-property: filter;
  filter: grayscale(0);
}

.already-matched:active {
  filter: grayscale(1);
}

.already-matched:active::after {
  content: "Already matched!";
  position: absolute;
  background-color: #0008;
  font-size: 0.875rem;
  font-weight: normal;
  top: 0;
}
</style>
