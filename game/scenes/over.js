import k, { OFFSET, MAX_WIDTH } from "../kaboom"
import { pb } from "../pocketbase"

k.scene("over", (score, topScores) => {
    k.play('game_over')

    pb.collection('scores').create({ name: localStorage.getItem('dotname') ?? "Anonymous", score: score }).catch((e) => {
        console.error("Could not upload score!")
    });

    k.add([
        k.text("GAME OVER", { size: 40, align: 'center' }),
        k.pos(k.center().sub(k.vec2(0, 250))),
        k.color([85, 85, 85]),
        k.anchor('center')
    ])

    k.add([
        k.text(`SCORE: ${score}`, { size: 20, align: 'center' }),
        k.pos(k.center().sub(k.vec2(0, 200))),
        k.color([85, 85, 85]),
        k.anchor('center')
    ])

    k.add([
        k.text("TOP SCORES TODAY", { size: 14, align: 'center' }),
        k.pos(k.center().sub(k.vec2(0, 140))),
        k.color([85, 85, 85]),
        k.anchor('center')
    ])

    if (topScores) {
        topScores.push({ name: localStorage.getItem('dotname') ?? 'Anonymous', score: score, current: true })
        topScores.sort((a, b) => b.score - a.score)

        let left = k.vec2(OFFSET + 40, k.height() / 2 - 100)
        let right = k.vec2(OFFSET + MAX_WIDTH - 40, k.height() / 2 - 100)

        topScores.forEach(t => {
            k.add([
                k.text(t.name, { size: 15, align: 'left' }),
                k.color(t.current ? [228, 30, 99] : [85, 85, 85]),
                k.anchor('left'),
                k.pos(left)
            ])

            k.add([
                k.text(t.score, { size: 15, align: 'right' }),
                k.color(t.current ? [228, 30, 99] : [85, 85, 85]),
                k.anchor('right'),
                k.pos(right)
            ])

            left = left.add(k.vec2(0, 40))
            right = right.add(k.vec2(0, 40))
        })
    } else {
        k.add([
            k.text("NETWORK ISSUES\ncould not load leaderboard", { align: 'center', size: 12 }),
            k.pos(k.vec2(OFFSET + MAX_WIDTH / 2, k.height() / 2 + 50)),
            k.color(k.RED),
            k.anchor('center')
        ])
    }


    const button = k.add([
        k.rect(120, 40),
        k.anchor('center'),
        k.area(),
        k.color([228, 30, 99]),
        k.pos(k.center().add(k.vec2(0, 250)))
    ])

    button.add([
        k.text("HOME", { size: 16 }),
        k.pos(0),
        k.anchor('center')
    ])

    button.onClick(() => {
        k.go('start')
    })
})
