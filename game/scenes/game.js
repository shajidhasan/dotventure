import k from "../kaboom"
import { makePlatform } from "../objects/platform"
import { makePlayer } from "../objects/player"
import { makeScore } from "../objects/score"

k.scene("game", () => {
    k.setGravity(1200)

    const player = k.add(makePlayer())
    const score = k.add(makeScore())

    let platform = k.add(makePlatform())

    for (let i = 0; i < 7; i++) {
        platform = k.add(makePlatform(platform.pos, true, true))
    }

    player.onCollide(('platform', (p) => {
        if (p.untouched) {
            p.use(k.offscreen({ destroy: true, distance: 10 }))
            platform = k.add(makePlatform(platform.pos))

            if (p.hasBomb) {
                const bomb = p.get('bomb')[0]
                bomb.enterState('active')
            }
        }
        p.untouched = false
    }))

    player.onUpdate(() => {
        player.maxHeight = Math.min(player.pos.y, player.maxHeight)
        k.camPos(k.width() / 2, player.maxHeight)
        score.text = -Math.trunc(player.maxHeight - k.height() / 2)
    })

    player.onDestroy(() => {
        k.go('over', score.text)
    })
})
