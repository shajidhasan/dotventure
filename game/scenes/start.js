import k from "../kaboom"

k.scene("start", () => {
    k.setGravity(600)

    const dot = k.add([
        k.rect(80, 80),
        k.color([228, 30, 99]),
        k.pos(k.center().sub(0, 300)),
        k.anchor('center'),
        k.area(),
        k.body()
    ])

    const platform = k.add([
        k.rect(300, 50),
        k.color([72, 79, 180]),
        k.pos(k.center().sub(0, 100)),
        k.anchor('top'),
        k.area(),
        k.body({ isStatic: true })
    ])

    platform.add([
        k.text("DOTVENTURE", { size: 40 }),
        k.color([85, 85, 85]),
        k.pos(0),
        k.anchor('bot')
    ])

    k.add([
        k.text("Your name:", { size: 14 }),
        k.color([85, 85, 85]),
        k.pos(k.center()),
        k.anchor('center')
    ])

    const name = k.add([
        k.text(localStorage.getItem('dotname') ?? "Anonymous", { size: 20 }),
        k.color([228, 30, 99]),
        k.pos(k.center().add(0, 30)),
        k.anchor('center'),
        area(),
    ])

    name.onClick(() => {
        const n = prompt("Enter name: ")
        if (n) {
            localStorage.setItem('dotname', n)
            name.text = n
        }
    })

    k.add([
        k.text("Touch controls:\nBottom half of the screen to move.\nTap on the top half to rocket jump.", { size: 13.5 }),
        k.pos(k.center().add(k.vec2(0, 100))),
        k.anchor('top'),
        k.color([85, 85, 85]),
    ])

    const begin = k.add([
        k.pos(k.center().add(0, 240)),
        k.area({ shape: new k.Rect(k.vec2(0), k.width() - 10, k.height() / 2 - 240 - 10) }),
        k.anchor('top')
    ])

    const beginText = begin.add([
        k.text("TAP HERE TO BEGIN", { size: 18 }),
        k.color([85, 85, 85]),
        k.pos(k.vec2(0, 20)),
        k.anchor('top'),
        k.opacity(1),
        { blinkTimer: 0 },
    ])

    begin.onClick(() => {
        k.go('game')
    })
    beginText.onUpdate(() => {
        beginText.blinkTimer += k.dt();

        if (beginText.blinkTimer >= 0.5) {
            beginText.opacity = (beginText.opacity === 1) ? 0 : 1;
            beginText.blinkTimer = 0;
        }
    })

})
