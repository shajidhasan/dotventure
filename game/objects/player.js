import k from "../kaboom"

export const makePlayer = () => {
    const player = k.make([
        k.rect(20, 20),
        k.color([228, 30, 99]),
        k.pos(k.center()),
        k.anchor('center'),
        k.area(),
        k.body(),
        k.z(10),
        k.offscreen({ destroy: true, distance: 100 }),
        'player',
        {
            maxHeight: Math.round(k.height() / 2)
        }
    ])

    player.onGround(() => {
        player.jump(600)
        k.play('jump')
    })

    k.onKeyDown('right', () => {
        if (player.pos.x + player.width / 2 < k.width()) {
            player.move(200, 0)
        }
    })

    k.onMouseDown(() => {
        const position = k.mousePos()
        if (position.x > k.width() / 2) {
            if (player.pos.x + player.width / 2 < k.width()) {
                player.move(200, 0)
            }
        } else {
            if (player.pos.x - player.width / 2 > 0) {
                player.move(-200, 0)
            }
        }
    })

    k.onKeyDown('left', () => {
        if (player.pos.x - player.width / 2 > 0) {
            player.move(-200, 0)
        }
    })

    player.onBeforePhysicsResolve((col) => {
        if (player.isJumping()) {
            col.preventResolution()
        }
    })

    return player
}

