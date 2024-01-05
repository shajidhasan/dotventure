import kaboom from "kaboom"

let width, height

if (window.innerWidth > 450) {
    width = 450
    height = window.innerHeight
}

const k = kaboom({
    background: [238, 238, 238],
    backgroundAudio: true,
    stretch: false,
    crisp: true,
    font: 'kitchen_sink',
    pixelDensity: window.devicePixelRatio / 2,
    debug: false,
    width,
    height,
})

k.volume(0.4)

export default k
