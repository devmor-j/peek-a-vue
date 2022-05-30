import confetti from 'canvas-confetti';

// https://www.kirilv.com/canvas-confetti/
export const basicCannon = () => confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});
