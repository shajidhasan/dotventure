import k from "../kaboom"

k.scene("start", () => {
    k.setGravity(800)

    const dot = k.add([
        k.rect(60, 60),
        k.color([228, 30, 99]),
        k.pos(k.center().sub(90, 600)),
        k.anchor('center'),
        k.area(),
        k.body()
    ])

    const platform = k.add([
        k.rect(300, 40),
        k.color([72, 79, 180]),
        k.pos(k.center().sub(0, 140)),
        k.anchor('top'),
        k.area(),
        k.body({ isStatic: true })
    ])

    platform.add([
        k.text("Dot's\nAdventure", { size: 28 }),
        k.color([85, 85, 85]),
        k.pos(50, 0),
        k.anchor('bot')
    ])

    k.add([
        k.text("Your name:", { size: 14 }),
        k.color([85, 85, 85]),
        k.pos(k.center().sub(0, 40)),
        k.anchor('center')
    ])

    const name = k.add([
        k.text(localStorage.getItem('dotname') ?? "Anonymous", { size: 20 }),
        k.color([228, 30, 99]),
        k.pos(k.center()),
        k.anchor('center'),
        k.area(),
    ])

    name.onClick(() => {
        const n = prompt("Enter name: ")
        if (n) {
            localStorage.setItem('dotname', n)
            name.text = n
        }
    })

    k.add([
        k.text("Touch and hold on the bottom half of\nthe screen to move.\nTap on the top half to rocket jump.\n\nOn keyboard: arrow keys to move.\nSpacebar to rocket jump.", { size: 12 }),
        k.pos(k.center().add(k.vec2(0, 100))),
        k.anchor('top'),
        k.color([85, 85, 85]),
    ])

    const begin = k.add([
        k.pos(k.center().add(0, 200)),
        k.area({ shape: new k.Rect(k.vec2(0), Math.min(k.width(), 400) - 10, k.height() / 2 - 240 - 10) }),
        k.anchor('top')
    ])

    const beginText = begin.add([
        k.text("TAP HERE TO BEGIN", { size: 18 }),
        k.color([85, 85, 85]),
        k.pos(k.vec2(0, 60)),
        k.anchor('top'),
        k.opacity(1),
        { blinkTimer: 0 },
    ])

    begin.onClick(() => {
        k.go("game")
    })
    k.onKeyPress('space', () => {
        k.go("game")
    })
    beginText.onUpdate(() => {
        beginText.blinkTimer += k.dt();

        if (beginText.blinkTimer >= 0.5) {
            beginText.opacity = (beginText.opacity === 1) ? 0 : 1;
            beginText.blinkTimer = 0;
        }
    })
})
