import k from "../kaboom"

export const makeBomb = () => {
    const bomb = k.make([
        k.rect(30, 20),
        k.pos(0, -10),
        k.anchor('bot'),
        k.color([85, 85, 85]),
        k.state('idle', ['idle', 'active']),
        'bomb'
    ])
    const bombHead = bomb.add([
        k.rect(20, 5),
        k.pos(0, -20),
        k.anchor('bot'),
        k.color([85, 85, 85])
    ])
    bomb.add([
        k.rect(5, 10),
        k.pos(0, -25),
        k.anchor('bot'),
        k.color([50, 50, 50])
    ])
    bomb.add([
        k.rect(5, 5),
        k.pos(0, -30),
        k.anchor('bot'),
        k.color(k.RED)
    ])

    const maxParticleCycles = 2
    let particleCycle = 1
    const makeParticles = (position) => {
        for (let i = 0; i < 10; i++) {
            const particle = k.add([
                k.pos(position),
                k.anchor("center"),
                k.rect(8, 8),
                k.scale(k.rand(0.1, 1)),
                k.color(k.choose([[128, 128, 128], [85, 85, 85], [255, 70, 0], [72, 79, 180]])),
                k.area({ collisionIgnore: ["particle", "player"] }),
                k.body(),
                k.lifespan(1, { fade: 0.5 }),
                k.opacity(1),
                k.move(choose([k.LEFT, k.RIGHT]), k.rand(200, 800)),
                "particle",
            ])
            particle.jump(rand(320, 1200))
        }

        if (particleCycle < maxParticleCycles) {
            particleCycle++
            k.wait(0.1, () => { makeParticles(position) })
        }

    }

    bomb.onStateEnter('active', async () => {
        await k.tween(
            k.rgb(85, 85, 85),
            k.rgb(255, 70, 0),
            1,
            (color) => {
                bomb.color = color
                bombHead.color = color
            },
            k.easings.easeInCubic
        )
        k.play(k.choose(['explosion_1', 'explosion_2']))
        k.shake()
        const position = bomb.parent.pos
        bomb.parent.destroy()
        makeParticles(position)
    })

    return bomb
}