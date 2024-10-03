import Singleton from "./Base/Singleton";
import Item from "./Item";
import GameManager from "./Manager/GameManager";
import WeaponManager from "./Weapon/WeaponManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraFollower extends Singleton<CameraFollower> {
    @property(cc.Camera)
    camera: cc.Camera = null;
    @property(Item)
    item: Item = null;
    @property(cc.Node)
    obj: cc.Node = null;
    @property(cc.Vec2)
    offset: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Float)
    targetX: number = 100;
    @property(cc.Float)
    targetY: number = 100;
    @property(cc.Node)
    endGame: cc.Node=null;
    @property(WeaponManager)
    weaponManager: WeaponManager=null;
    isTweenRunning: boolean = false;
    isTweenRunning2: boolean = false;

    following: boolean = false;
    constructor() {
        super();
        CameraFollower.instance = this;
    }
    protected start(): void {
        this.following = true;
        this.offset = cc.v2(this.node.position.x - this.obj.position.x, this.node.position.y - this.obj.position.y);
    }
    @property(cc.Animation)
    cameraAnim: cc.Animation = null;
    update(dt: number) {
        if (!GameManager.instance.isEnd) {
            if (this.following && this.obj != null) {
                this.SetInstantPos(dt);

            }
            if (this.weaponManager.isX10 && !this.isTweenRunning) {
                this.isTweenRunning = true;
                // setTimeout(() => {
                //     cc.tween(this.camera)
                //         .to(1, { zoomRatio: 0.75 }, { easing: 'sineOut' })
                //         .call(() => {
                //             // this.isTweenRunning = false;
                //         })
                //         .start();
                // }, 800);
                this.cameraAnim.play("CameraZoom");
            }

            if (this.weaponManager.isDestroy && !this.isTweenRunning2) {
                this.isTweenRunning2 = true;
                // setTimeout(() => {
                //     cc.tween(this.camera)
                //         .to(0.7, { zoomRatio: 0.5 }, { easing: 'sineOut' })
                //         .call(() => {
                //             //   this.isTweenRunning2= false;
                //         })
                //         .start();
                // }, 800)
                this.cameraAnim.play("CameraZoom2");
            }
        }


        // if(this.item.isHit){
        //     this.obj=null;
        // }
    }
    SetInstantPos(dt: number) {
        this.node.x = cc.misc.lerp(this.node.x, this.obj.x + this.offset.x, 0.1);
        let posY = cc.misc.clampf(this.obj.y + this.offset.y, -3100, 3100);
        this.node.y = cc.misc.lerp(this.node.y, posY, 0.1);

    }

    EndGamePos(dt: number) {
        this.obj = null;

        let targetPos = cc.v2(this.targetX, this.targetY);
        let currentPos = this.node.getPosition();


        let smoothFactor = 0.01;
        let newPos = currentPos.lerp(targetPos, smoothFactor);

        this.node.setPosition(newPos);
        setTimeout(() => {

            cc.tween(this.camera)
                .to(1, { zoomRatio: 0.3 }, { easing: 'sineOut' })
                .call(() => {

                })
                .start();
        }, 800)
        //this.camera.zoomRatio=0.3

    }

    end() {
        GameManager.Instance(GameManager).EndGame();
        this.endGame.active = true;
    }
    shakeCamera(duration: number, strength: number) {

        const cameraNode = this.camera.node


        const shakeAction = cc.repeat(
            cc.sequence(
                cc.moveBy(0.02, cc.v2(strength, strength)),
                cc.moveBy(0.02, cc.v2(-strength, -strength)),
                cc.moveBy(0.02, cc.v2(-strength, strength)),
                cc.moveBy(0.02, cc.v2(strength, -strength))
            ), duration / 0.08
        );


        const resetPosition = cc.callFunc(() => {
            cameraNode.setPosition(cc.v2(0, 0));
        });


        cameraNode.runAction(cc.sequence(shakeAction, resetPosition));
    }


}
