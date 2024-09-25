import BaseCharacter from "./Base/BaseCharacter";

const {ccclass, property} = cc._decorator;

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
    maxDis: number = 50;

    @property(cc.Float)
    minDis: number = 10;
minSpace:number=120
    static enemies: cc.Node[] = [];  

    start(): void {
        this.player = cc.find("Canvas/Player");
        Enemy.enemies.push(this.node);  
    }

    update(dt: number) {
        this.Move(dt);
    }

    Move(dt: number) {
        if (!this.player) {
            return;
        }
    
        let enemyPos = this.node.position;
        let playerPos = this.player.position;
        let directionToPlayer = playerPos.sub(enemyPos).normalize(); 
    
        
        let separationOffset = this.CheckDistanceBetweenEnemies();
    

        let finalDirection = directionToPlayer.add(separationOffset).normalize();
        
        if (this.Distance(playerPos, enemyPos) > this.minDis) {
            let moveStep = finalDirection.mul(this.speed * dt);
            this.node.position = enemyPos.add(moveStep);
        }
    
        if (directionToPlayer.x > 0) {
            this.node.scaleX = -Math.abs(this.node.scaleX);  
        } else {
            this.node.scaleX = Math.abs(this.node.scaleX);  
        }
    }
    

    CheckDistanceBetweenEnemies(): cc.Vec3 {
        let separationOffset = cc.v3(0, 0, 0); 

        for (let i = 0; i < Enemy.enemies.length; i++) {
            let otherEnemy = Enemy.enemies[i];

            if (otherEnemy !== this.node) {
                let distance = this.Distance(this.node.position, otherEnemy.position);

                
                if (distance < this.minSpace) {
                    let directionAwayFromOther = this.node.position.sub(otherEnemy.position).normalize();
                    let pushStrength = this.minSpace - distance;
                    separationOffset = separationOffset.add(directionAwayFromOther.mul(pushStrength));
                }
            }
        }

        return separationOffset;
    }

    onCollisionEnter(other: cc.Collider): void {
        if (other.node.name == "Weapon") {
            this.anim.play("Die");
            setTimeout(() => {
                this.node.active = false;
            }, 400);
            this.player = null;
        }
    }

    Distance(vec1: cc.Vec3, vec2: cc.Vec3): number {
        return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
}
