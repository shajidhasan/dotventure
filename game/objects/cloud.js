import k from "../kaplay";


export const makeCloud = (x, y, color) => {
    const cloud = k.make([
        k.pos(x ?? k.width(), y ?? 0),
        k.anchor('botleft'),
        k.move(k.LEFT, k.randi(20, 40)),
        k.offscreen({ destroy: true, distance: k.height() }),
        k.z(-10),
        'cloud',
    ])

    cloud.add([
        k.pos(0, 0),
        k.anchor('botleft'),
        k.rect(k.choose([120, 140, 160]), 30),
        k.color(color ?? k.WHITE),
        k.opacity(0.5)
    ])

    cloud.add([
        k.pos(k.choose([20, 30, 40]), -30),
        k.anchor('botleft'),
        k.rect(k.choose([60, 70, 80]), 30),
        k.color(color ?? k.WHITE),
        k.opacity(0.5)
    ])

    return cloud
}
