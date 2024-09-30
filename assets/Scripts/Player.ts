import BaseCharacter from "./Base/BaseCharacter";
import Joystick from "./Joystick";
import WeaponManager from "./Weapon/WeaponManager";
import GameManager from "./Manager/GameManager";
import CameraFollower from "./CameraFollow";
import SoundManager from "./Manager/SoundManager";
import Singleton from "./Base/Singleton";
import Item from "./Item";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends BaseCharacter {

    @property(Joystick)
    joystick: Joystick = null;

    @property(cc.Label)
    label: cc.Label = null;
    @property
    speed: number = 100;
    @property(cc.Animation)
    anim: cc.Animation = null;
    @property(WeaponManager)
    weaponManager: WeaponManager

    @property(cc.Sprite)
    characterSprite: cc.Sprite

    pos: cc.Vec2 = cc.v2(0, 0);
    tryTime: number = 2;
    isEnd: boolean = false;
    isTweenRunning: boolean = false;
    startPos: cc.Vec2 = null;
    canmove: boolean = true;
    isTweenRunning2: boolean = false;
    start(): void {
        this.startPos = this.node.getPosition();
    }
    update(dt: number) {
       
        if (this.weaponManager.isDie) {
            //this.anim.play("Die");
            GameManager.instance.spawnBone(this.node.position, 1);
            this.node.active = false
            this.weaponManager.isDie = false;
            this.tryTime--;
            console.log(this.tryTime)


            this.scheduleOnce(() => {

                this.node.setPosition(this.startPos);
                this.node.active = true;
                this.weaponManager.node.active = true;
                this.weaponManager.score = 0;

                if (this.tryTime <= 0) {
                    this.canmove = false;
                    this.isEnd = true;
                    GameManager.Instance(GameManager).EndGame();
                    setTimeout(() => {
                        CameraFollower.Instance(CameraFollower).endGame.active = true;
                        SoundManager.instance.PauseAll();
                    }, 1000);
                }

            }, 1.5)
            this.weaponManager.node.active = false;

        }
        // if (this.curHp <= 0) {

        //cc.director.loadScene(cc.director.getScene().name);

        // }
        this.pos = this.node.getPosition();
        this.slider.fillRange = this.curHp / (this.hp);
        this.label.string = this.weaponManager.score.toString();
        if (this.weaponManager.isX10 && !this.isTweenRunning) {
            this.isTweenRunning = true;
            cc.tween(this.node)
                .to(0.8, { scaleX: 1.8, scaleY: 1.8 })
                .call(() => { })
                .start();
        }
        if (this.weaponManager.isDestroy && !this.isTweenRunning2) {

            this.isTweenRunning2 = true;
            this.joystick.node.active = false;
            cc.tween(this.node)
                .to(0.8, { scaleX: 2.2, scaleY: 2.2 })
                .call(() => { })
                .start();
            return
        }
        if (!this.weaponManager.isDestroy && !this.weaponManager.isDie) {
            if (this.canmove)
                this.Move();
        }



    }
    Move() {

        if (this.joystick.dir.x == 0 && this.joystick.dir.y == 0) {

            return;
        }
        this.node.x += this.joystick.dir.x * this.speed;
        this.node.y += this.joystick.dir.y * this.speed;

        if (this.joystick.dir.x > 0) {
            this.characterSprite.node.scaleX = -Math.abs(this.characterSprite.node.scaleX);
        } else {
            this.characterSprite.node.scaleX = Math.abs(this.characterSprite.node.scaleX);
        }

    }

    DestroyEnemyV2() {

        let allNodes = cc.director.getScene().children;


        allNodes.forEach(node => {
            if (node.name == "Enemyv2 copy") {
                node.active = false;
            }
        });
    }
    onCollisionEnter(other: cc.Collider): void {
       
        if (other.node.name == "EnemyV3 copy") {
            this.scheduleOnce(() => {
                GameManager.instance.spawnBone(this.node.position,1.5);
                this.node.active = false;
            }, 0.1);

        }
        
        
    }

}



