import k from "../kaboom"

k.scene("over", (score) => {
    k.play('game_over')

    let locked = true
    k.wait(1, () => {
        locked = false
    })

    k.onMousePress(() => {
        if (!locked) {
            k.go('game')
        }
    })

    k.add([
        k.text("GAME OVER", { font: 'kitchen_sink', size: 40, align: 'center' }),
        k.pos(k.center().sub(k.vec2(0, 80))),
        k.color([85, 85, 85]),
        k.anchor('center')
    ])

    k.add([
        k.text(`SCORE: ${score}`, { font: 'kitchen_sink', size: 20, align: 'center' }),
        k.pos(k.center()),
        k.color([85, 85, 85]),
        k.anchor('center')
    ])
})
