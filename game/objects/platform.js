import k from '../kaboom'
import { makeBomb } from './bomb'

const makeParticles = (position) => {
    for (let i = 0; i < 10; i++) {
        k.add([
            k.pos(position.add(k.vec2(randi(-40, 40), 0))),
            k.anchor("center"),
            k.rect(10, 10),
            k.scale(k.rand(0.5, 1)),
            k.color([72, 79, 180]),
            k.area({ collisionIgnore: ["particle", "player"] }),
            k.body(),
            k.lifespan(1, { fade: 0.5 }),
            k.opacity(1),
            k.move(choose([k.LEFT, k.RIGHT]), k.rand(10, 100)),
            "particle",
        ])
    }
}

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
        k.offscreen({ destroy: true, distance: 240 }),
        k.health(5),
        'platform',
        {
            direction: 'right',
            untouched: true,
            isMoving: k.chance(0.5) && lastPosition && !noMove,
            hasBomb: k.chance(0.5) && lastPosition && !noBomb,
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

    platform.onDeath(() => {
        makeParticles(platform.pos)
        platform.destroy()
    })

    return platform
}
