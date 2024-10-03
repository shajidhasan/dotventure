import k from "../kaplay"
import { makePlatform } from "../objects/platform"
import { makePlayer } from "../objects/player"
import { makeRocketIndicator } from "../objects/rocketIndicator"
import { makeCloud } from "../objects/cloud"
import { makeScore } from "../objects/score"
import { pb } from "../pocketbase"
import { makeControls } from "../objects/controls"

k.scene("game", () => {
    k.setGravity(1200)

    let cloudStep = 1
    for (let _ = 0; _ < 5; _++) {
        k.add(makeCloud(k.rand(k.width()), k.rand(k.height())))
    }

    k.loop(3, () => {
        if (k.chance(0.7))
            k.add(makeCloud(null, k.rand(k.camPos().y + k.rand(k.height() / 2) * k.choose([1, -1]))))
    })


    const player = k.add(makePlayer())
    const score = k.add(makeScore())
    const indicator = k.add(makeRocketIndicator())

    if (k.width() <= 600) {
        makeControls().forEach(control => k.add(control))
    }

    let lastPlatform = k.add(makePlatform())

    player.onUpdate(() => {
        if (-lastPlatform.pos.y < player.score) {
            lastPlatform = k.add(makePlatform(lastPlatform.pos, player.score < 400, player.score < 400))
        }
        score.text = Math.trunc(player.score)
        indicator.check(player.score)
        k.camPos(player.camPos)
        const step = Math.ceil(Math.abs(player.pos.y - k.height()) / k.height())
        if (step === cloudStep) {
            const end = -k.height() * cloudStep
            for (let _ = 0; _ < 5; _++) {
                k.add(makeCloud(k.rand(k.width() / 2, k.width()), k.rand(end + k.height(), end)))
            }
            cloudStep++
        }
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

    let topScorers = null

    pb.collection('scores').getList(1, 7, {
        sort: '-score',
        filter: 'created >= @todayStart && created < @todayEnd'
    }).then(data => {
        topScorers = data.items
    }).catch(e => {
        console.log("Could not load leaderboard!")
    })


    player.onDestroy(() => {
        k.go('over', score.text, topScorers)
    })
})
