import k from "../kaboom"

const indicator = () => {
    return {
        available: true,
        lastUsedAt: 0,
        require: ['color'],
        rocketUsed(score) {
            this.available = false
            this.color = k.rgb(160, 160, 160)
            this.lastUsedAt = score
        },
        check(score) {
            if (score - 1000 > this.lastUsedAt && !this.available) {
                this.available = true
                this.color = k.RED
                k.play('rocket_available')
            }
        }
    }
}

export const makeRocketIndicator = () => {
    const rocket = k.make([
        k.text('↑', { size: 30 }),
        k.color(k.RED),
        k.anchor("topright"),
        k.pos(k.width() - 36, 16),
        k.fixed(),
        k.z(100),
        indicator(),
        'rocket'
    ])

    return rocket
}
