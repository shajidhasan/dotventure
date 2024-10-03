import k, { getWidth } from "../kaplay"
import { makeCloud } from "../objects/cloud"
import { makeControls } from "../objects/controls";


const desktop = k.width() > 600;

k.scene("start", () => {
    k.setGravity(800)

    for (let _ = 0; _ < 5; _++) {
        k.add(makeCloud(k.rand(k.width()), k.rand(k.height())))
    }

    k.loop(3, () => {
        if (k.chance(0.7))
            k.add(makeCloud(null, k.rand(k.camPos().y + k.rand(k.height() / 2) * k.choose([1, -1]))))
    })

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
        k.area({ shape: new k.Rect(k.vec2(0, 0), 300, 100) }),
        k.pos(k.center()),
        k.anchor('center')
    ])

    const nameText = name.add([
        k.text(localStorage.getItem('dotname') ?? "Anonymous", { size: 20 }),
        k.anchor('center'),
        k.pos(0),
        k.color([228, 30, 99]),
    ])

    name.onClick(() => {
        const n = prompt("Enter name: ")
        if (n) {
            localStorage.setItem('dotname', n)
            nameText.text = n
        }
    })

    k.add([
        k.text(
            desktop ?
                "LEFT and RIGHT arrow keys to move.\n\nSPACEBAR to rocket jump."
                :
                "Tap and hold on-screen arrows to move.\n\nTap on the top half of your screen\nto rocket jump."
            , { size: 12 }),
        k.pos(k.center().add(k.vec2(0, 100))),
        k.anchor('top'),
        k.color([85, 85, 85]),
    ])

    const begin = k.add([
        k.pos(k.center().add(0, 200)),
        k.area({ shape: new k.Rect(k.vec2(0), getWidth() - 10, k.height() / 2) }),
        k.anchor('top')
    ])

    const beginText = begin.add([
        k.text(
            desktop ?
                "PRESS SPACEBAR TO BEGIN" : "TAP HERE TO BEGIN"
            , { size: 18 }),
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

    const github = k.add([
        k.text("GitHub →", { size: desktop ? 24 : 18 }),
        k.anchor('topright'),
        k.color([85, 85, 85]),
        k.pos(k.width() - 20, 20),
        k.area(),
    ])

    github.onClick(() => {
        window.open('https://github.com/shajidhasan/dotventure', '_blank').focus();
    })
})
