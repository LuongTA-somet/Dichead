interface Global {
    stickPos: cc.Vec2,
    touchPos: cc.Vec2,
    isDraggingJoyStick: boolean,
    isStartGame: boolean,
    isEndGame: boolean,
    isPause: boolean,
    offAllSound: boolean,
}

let Global: Global = {
    stickPos: cc.Vec2.ZERO,
    touchPos: cc.Vec2.ZERO,
    isDraggingJoyStick: false,
    isStartGame: false,
    isEndGame: false,
    isPause: false,
    offAllSound: false,}
    export default Global;
