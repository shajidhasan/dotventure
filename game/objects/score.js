import k from "../kaboom"

export const makeScore = () => {
    const score = k.make([
        k.text(0, { size: 30, align: 'left' }),
        k.color([85, 85, 85]),
        k.anchor("topleft"),
        k.pos(20, 20),
        k.fixed(),
        k.z(100),
        'score'
    ])

    return score
}
