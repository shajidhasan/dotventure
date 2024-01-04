import k from "../kaboom"

export const makeScore = () => {
    const score = k.make([
        k.text(0, { font: 'kitchen_sink', size: 30 }),
        k.color([85, 85, 85]),
        k.anchor("center"),
        k.pos(k.width() / 2, 40),
        k.fixed(),
        k.z(100),
        'score'
    ])

    return score
}
