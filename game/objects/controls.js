import k from "../kaplay"

export const makeControls = () => {
    let time = 0
    const mx = 20
    const mb = 100

    const left = k.make([
        k.text('←', { size: 80 }),
        k.pos(mx, k.height() - mb),
        k.color([85, 85, 85]),
        k.opacity(0.5),
        k.fixed(),
        k.z(100),
        k.anchor('left'),
        "control"
    ]);

    const right = k.make([
        k.text('→', { size: 80 }),
        k.pos(k.width() - mx + 10, k.height() - mb),
        k.color([85, 85, 85]),
        k.opacity(0.5),
        k.fixed(),
        k.z(100),
        k.anchor('right'),
        "control"
    ]);


    k.onUpdate('control', control => {
        time += k.dt()
        if (time > 10 && time <= 20) {
            control.opacity = Math.min(control.opacity, (20 - time) / 10)
        } else if (time > 20) {
            control.destroy()
        }
    })


    return [left, right]
}