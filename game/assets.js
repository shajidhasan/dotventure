import k from "./kaboom"

import jump from "./assets/sounds/jump.ogg"
import gameOver from "./assets/sounds/game_over.ogg"
import explosion1 from "./assets/sounds/explosion_1.ogg"
import explosion2 from "./assets/sounds/explosion_2.ogg"

import kitchenSink from "./assets/fonts/kitchen_sink.ttf"

k.loadFont("kitchen_sink", kitchenSink)

k.loadSound('jump', jump)
k.loadSound('game_over', gameOver)
k.loadSound('explosion_1', explosion1)
k.loadSound('explosion_2', explosion2)
