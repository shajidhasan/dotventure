import k, { getOffset, getWidth } from "../kaplay"

const control = () => {
    const makeRocketParticles = async (player) => {
        for (let i = 0; i < 10; i++) {
            player.add([
                k.pos(k.randi(-5, 5), 10),
                k.anchor("center"),
                k.rect(5, 5),
                k.scale(k.rand(0.5, 1)),
                k.color(k.choose([k.YELLOW, k.RED])),
                k.area({ collisionIgnore: '*' }),
                k.body(),
                k.lifespan(0.05, { fade: 0.04 }),
                k.opacity(1),
                k.move(k.choose([k.vec2(-1, k.randi(1, 10)).unit(), k.vec2(1, k.randi(1, 10)).unit()]), k.rand(100, 500)),
                "particle",
            ])
        }
    }
    return {
        require: ['pos', 'body'],
        score: 0,
        camPos: k.center(),
        moveLeft() {
            if (this.pos.x - this.width / 2 > 0) {
                this.move(-200, 0)
            }
        },
        moveRight() {
            if (this.pos.x + this.width / 2 < k.width()) {
                this.move(200, 0)
            }
        },
        async rocketJump() {
            this.jump(1200)
            k.play('rocket')
            for (let i = 0; i < 5; i++) {
                await k.wait(0.05)
                makeRocketParticles(this)
            }
        },
        update() {
            this.score = Math.max(this.score, k.height() / 2 - this.pos.y)
            this.camPos = k.vec2(getOffset() + getWidth() / 2, -this.score + k.height() / 2)
        }
    }
}

export const makePlayer = () => {
    const player = k.make([
        k.rect(20, 20),
        k.color([228, 30, 99]),
        k.pos(k.center()),
        k.anchor('center'),
        k.area(),
        k.body(),
        k.z(10),
        k.offscreen({ destroy: true, distance: 200 }),
        control(),
        'player'
    ])

    player.onGround(() => {
        player.jump(600)
        k.play('jump')
    })

    player.onBeforePhysicsResolve((col) => {
        if (player.isJumping()) {
            col.preventResolution()
        } else {
            if (col.isBottom()) {
                const platform = col.target
                platform.hurt(1)
                if (platform.hasBomb)
                    platform.get('bomb')[0].enterState('active')
            }
        }
    })

    return player
}

