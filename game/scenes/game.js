import k from "../kaboom"
import { makePlatform } from "../objects/platform"
import { makePlayer } from "../objects/player"
import { makeRocketIndicator } from "../objects/rocketIndicator"
import { makeScore } from "../objects/score"
import { pb } from "../pocketbase"

k.scene("game", () => {
    k.setGravity(1200)

    const player = k.add(makePlayer())
    const score = k.add(makeScore())
    const indicator = k.add(makeRocketIndicator())

    let lastPlatform = k.add(makePlatform())

    player.onUpdate(() => {
        if (-lastPlatform.pos.y < player.score) {
            lastPlatform = k.add(makePlatform(lastPlatform.pos, player.score < 400, player.score < 400))
        }
        score.text = Math.trunc(player.score)
        indicator.check(player.score)
        k.camPos(player.camPos)
    })
    k.onKeyPress('space', () => {
        if (!indicator.available) return
        indicator.rocketUsed(player.score)
        player.rocketJump()
    })
    k.onKeyDown('left', () => {
        player.moveLeft()
    })
    k.onKeyDown('right', () => {
        player.moveRight()
    })
    k.onMouseDown(() => {
        const mousePosition = k.mousePos()
        if (mousePosition.y < k.height() / 2) return
        if (mousePosition.x < k.width() / 2) player.moveLeft()
        else player.moveRight()
    })
    k.onMousePress(() => {
        const mousePosition = k.mousePos()
        if (mousePosition.y < k.height() / 2) {
            if (!indicator.available) return
            indicator.rocketUsed(player.score)
            player.rocketJump()
        }
    })

    let topScorers = []

    pb.collection('scores').getList(1, 7, {
        sort: '-score',
    }).then(data => {
        topScorers = data.items
    })


    player.onDestroy(() => {
        k.go('over', score.text, topScorers)
    })
})
