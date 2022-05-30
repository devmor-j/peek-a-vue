<script>
export default {
  props: {
    matched: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true,
    },
    // [ ] refactor value prop to faceValue
    value: {
      type: [String, Number],
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, context) {
    const selectCard = () => {
      if (props.matched) return;
      context.emit('select-card', {
        position: props.position,
        faceValue: props.value,
      })
    }

    return {
      selectCard,
    }
  }
};
</script>

<template>
  <div class="card" @click="selectCard" :style="{ cursor: matched ? 'not-allowed' : 'pointer' }">

    <div v-if="visible" class="card-face is-front" :class="{ 'scale-down': matched }">
      <img :src="`/images/${value}.png`" :alt="value" draggable="false">
      <img v-if="matched" class="icon-checkmark" src="/images/checkmark.svg" alt="" draggable="false">
    </div>

    <div v-else class="card-face is-back"></div>

  </div>
</template>

<style>
.card {
  position: relative;
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

.scale-down {
  transition-duration: 0.2s;
  transition-property: filter, transform;
  filter: grayscale(0);
  transform: scale(1);
}

.scale-down:active {
  filter: grayscale(1);
  transform: scale(0.975);
}

.scale-down:active::after {
  content: "Already matched!";
  position: absolute;
  background-color: #0008;
  font-size: 0.875rem;
  font-weight: normal;
  top: 0;
}
</style>
