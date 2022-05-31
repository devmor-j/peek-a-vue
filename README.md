# Peek a Vue

Classic card matching game built with [Vue 3](https://vuejs.org/).

![Preview (gif)](./screenshot/peek-a-vue.gif)

## Features

- 4x4 Gameboard with 8 unique shapes
- Has start/restart game buttons
- Shows [confetti](https://github.com/catdad/canvas-confetti) when player wins
- Great game mechanics and tested with no (known) bugs
- Written in Vue [setup hook](https://vuejs.org/api/composition-api-setup.html) architecture.
- Uses [lodash](https://lodash.com/) `shuffle` function for shuffling cards.

## How to develop this project

Either clone this repo:

```sh
git clone https://github.com/devmor-j/peek-a-vue.git
```
 
or use [degit](https://github.com/Rich-Harris/degit) to only get the lastest of branch *main*:

```sh
npx degit https://github.com/devmor-j/peek-a-vue.git
```

then install dependencies with your package manager:

```sh
npm install
```

## Scripts (based on vue-cli)

- Compiles and hot-reloads for development:

  `npm run serve`

- Compiles and minifies for production:

  `npm run build`

- Lints and fixes files:

  `npm run lint`

To customize configurations See [Configuration Reference](https://cli.vuejs.org/config/).
