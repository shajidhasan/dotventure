import kaboom from "kaboom"

let height, width

if (window.innerHeight / window.innerWidth < 1) {
    height = window.innerHeight
    width = height / 1.5
}

const k = kaboom({
    background: [238, 238, 238],
    backgroundAudio: true,
    stretch: false,
    crisp: true,
    font: 'kitchen_sink',
    height,
    width,
})

k.volume(0.4)

export default k
