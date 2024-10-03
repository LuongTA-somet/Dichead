import BaseCharacter from "./Base/BaseCharacter";
import SoundManager from "./Manager/SoundManager";
import GameManager from "./Manager/GameManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends BaseCharacter {

    @property(cc.Node)
    player: cc.Node = null;
    @property
    speed: number = 200;

    @property(cc.Integer)
    hp: number = 1;

    @property(cc.Animation)
    anim: cc.Animation = null;


    @property(cc.Float)
    minSpace: number = 120

    @property(cc.Float)
    minDis: number = 10;
    public rigid: cc.RigidBody = null;
    static enemies: cc.Node[] = [];


    start(): void {
        this.player = cc.Canvas.instance.node.getChildByName("Player");

        this.rigid = this.node.getComponent(cc.RigidBody);
    }

    // update(dt: number) {

    //     if (GameManager.instance.isStart) {

    //         this.Move(dt);
    //     }
    //     if (this.rigid != null) {
    //         this.rigid.syncPosition(true);
    //     }
    // }
    FuncUpdate(dt: number, isStart: boolean) {
        if (isStart) {
            this.Move(dt);
        }
        if (this.rigid != null) {
            this.rigid.syncPosition(true);
        }
    }
    Move(dt: number) {


        let enemyPos = this.node.position;
        let playerPos = this.player.position;
        let directionToPlayer = playerPos.sub(enemyPos).normalize();


        if (this.Distance(playerPos, enemyPos) > this.minDis) {
            let moveStep = directionToPlayer.mul(this.speed * dt);
            this.node.position = enemyPos.add(moveStep);
        }

        if (directionToPlayer.x > 0) {
            this.node.scaleX = -Math.abs(this.node.scaleX);
        } else {
            this.node.scaleX = Math.abs(this.node.scaleX);
        }
    }



    onCollisionEnter(other: cc.Collider): void {
        if (other.node.name == "Weapon") {
            SoundManager.Instance(SoundManager).Play("EnemyDie");


            this.applyKnockback(other.node, 15);

            GameManager.instance.enemyArr
            this.scheduleOnce(() => {
                GameManager.instance.spawnBone(this.node.position, 1);
                const index = GameManager.instance.enemyArr.indexOf(this);
                if (index > -1) {
                    GameManager.instance.enemyArr.splice(index, 1);
                }
                this.node.active = false;
                this.node.destroy();
               
            }, 0.);

            ;
        }
        if (other.node.name == "ItemDestroy") {


            setTimeout(() => {
                GameManager.instance.spawnBone(this.node.position, 1);
                this.node.active = false;
            }, 400);
        }
    }
    applyKnockback(weaponNode: cc.Node, knockbackForce: number) {

        let knockbackDirection = this.node.position.sub(weaponNode.position).normalize();


        let knockbackVector = knockbackDirection.mul(knockbackForce);


        cc.tween(this.node)
            .by(0.2, { position: cc.v3(knockbackVector.x, knockbackVector.y, 0) }, { easing: "quadOut" })
            .start();
    }


    Distance(vec1: cc.Vec3, vec2: cc.Vec3): number {
        return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
}
