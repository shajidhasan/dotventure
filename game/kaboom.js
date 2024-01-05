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
