import Enemy from "./Enemy";
import SoundManager from "./Manager/SoundManager";
import CameraFollower from "./CameraFollow";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {
    @property(Player)
   player:Player=null;

    @property(cc.Float)
    minSpace:number=120
@property(CameraFollower)
cameraFollow:CameraFollower;
isHit:boolean=false;
isEndGame:boolean=false;
isTweenRunning:boolean =false;
    start(): void {
  
        Enemy.enemies.push(this.node);  
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
        if(other.node.name=="Weapon"){
           this.isHit=true
            this.isTweenRunning = true;  
          this.node.opacity=0;
            setTimeout(() => {
                cc.tween(this.node)
                .to(2.5, { scaleX: 50, scaleY: 50 })
                .call(() => { this.isTweenRunning = false; })  
                .start();
               
            }, 700);
            setTimeout(() => {
                
               this.isEndGame=true;
            }, 3000);
        }
    
    }
protected update(dt: number): void {
    if(this.isEndGame){
        this.cameraFollow.EndGamePos(4);
        setTimeout(() => {
            this.cameraFollow.endGame.active=true;
        }, 1000);
      
    }
}
    Distance(vec1: cc.Vec3, vec2: cc.Vec3): number {
        return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
}
