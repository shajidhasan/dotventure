import k from '../kaboom'
import { makeBomb } from './bomb'

export const makePlatform = (lastPosition = undefined, noBomb = false, noMove = false) => {
    let position = k.center().add(0, 200)

    if (lastPosition) {
        const { x, y } = lastPosition
        const dy = k.randi(80, 120)
        position = k.vec2(k.randi(Math.max(40, x - 200), Math.min(x + 200, k.width() - 40)), y - dy)
    }

    const platform = k.make([
        k.rect(80, 10),
        k.color([72, 79, 180]),
        k.pos(position),
        k.anchor('bot'),
        k.area(),
        k.body({ isStatic: true }),
        'platform',
        {
            direction: 'right',
            untouched: true,
            isMoving: k.chance(0.5) && lastPosition && !noMove,
            hasBomb: k.chance(0.5) && lastPosition && !noBomb
        }
    ])

    if (platform.isMoving) {
        platform.onUpdate(() => {
            if (platform.pos.x + platform.width / 2 >= k.width()) {
                platform.direction = 'left'
            } else if (platform.pos.x - platform.width / 2 <= 0) {
                platform.direction = 'right'
            }

            if (platform.direction == 'right') {
                platform.move(200, 0)
            } else {
                platform.move(-200, 0)
            }
        })
    }

    if (platform.hasBomb) {
        platform.add(makeBomb())
    }

    return platform
}
