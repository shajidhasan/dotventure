import kaplay from "kaplay"

const MAX_WIDTH = 400

const k = kaplay({
    background: [204, 234, 244],
    backgroundAudio: true,
    stretch: false,
    crisp: true,
    font: 'kitchen_sink',
    global: false,
    debug: false,
})

k.volume(0.4)

export default k

export const getWidth = () => {
    return Math.min(k.width(), MAX_WIDTH)
}
export const getOffset = () => {
    return (k.width() - Math.min(k.width(), MAX_WIDTH)) / 2
}
