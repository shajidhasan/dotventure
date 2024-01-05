import kaboom from "kaboom"

const k = kaboom({
    background: [238, 238, 238],
    backgroundAudio: true,
    stretch: false,
    crisp: true,
    font: 'kitchen_sink',
    global: false,
    debug: true,
})

k.volume(0.4)

export default k
export const MAX_WIDTH = Math.min(k.width(), 450)
export const OFFSET = (k.width() - MAX_WIDTH) / 2
