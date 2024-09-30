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

    static enemies: cc.Node[] = [];


    start(): void {
        this.player = cc.Canvas.instance.node.getChildByName("Player");
        //  Enemy.enemies.push(this.node);  
    }

    update(dt: number) {
        //if(this.play.isEnd)return;
        if (GameManager.instance.isStart)
        {

            this.Move(dt);
        }

    }

    Move(dt: number) {


        let enemyPos = this.node.position;
        let playerPos = this.player.position;
        let directionToPlayer = playerPos.sub(enemyPos).normalize();


        // let separationOffset = this.CheckDistanceBetweenEnemies();


        // let finalDirection = directionToPlayer.add(separationOffset).normalize();

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


    // CheckDistanceBetweenEnemies(): cc.Vec3 {
    //     let separationOffset = cc.v3(0, 0, 0); 

    //     for (let i = 0; i < Enemy.enemies.length; i++) {
    //         let otherEnemy = Enemy.enemies[i];

    //         if (otherEnemy !== this.node) {
    //             let distance = this.Distance(this.node.position, otherEnemy.position);


    //             if (distance < this.minSpace) {
    //                 let directionAwayFromOther = this.node.position.sub(otherEnemy.position).normalize();
    //                 let pushStrength = this.minSpace - distance;
    //                 separationOffset = separationOffset.add(directionAwayFromOther.mul(pushStrength));
    //             }
    //         }
    //     }

    //     return separationOffset;
    // }

    onCollisionEnter(other: cc.Collider): void {
        if (other.node.name == "Weapon") {
            SoundManager.Instance(SoundManager).Play("EnemyDie");


            this.applyKnockback(other.node, 15);


            this.scheduleOnce(() => {
                GameManager.instance.spawnBone(this.node.position, 1);
                this.node.active = false;
            }, 0.);

            // this.anim.play("Die");  
            // setTimeout(() => {
            //     this.node.active = false;
            // }, 400);
            // this.player = null;
        }
        if (other.node.name == "ItemDestroy") {
            // this.anim.play("Die");

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
