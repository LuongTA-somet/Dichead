

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss extends cc.Component {

    @property
    speed: number = 200;  
@property(cc.Integer)
hp:number=1;
@property(cc.Animation)
anim: cc.Animation = null;
@property(cc.Node)  
player: cc.Node = null;
@property(cc.Float)
minDis:number=10;

start(): void {
    this.player = cc.find("Canvas/Player");
}
    update(dt: number) {
              
    this.Move(dt)
   
    }

    Move(dt:number){
        
        if (!this.player) {
            return;
        }
        let enemyPos = this.node.position;
        let playerPos = this.player.position;

      
        let direction = playerPos.sub(enemyPos).normalize();

        
      
        if(this.Distance(playerPos,enemyPos)>this.minDis){
            let moveStep = direction.mul(this.speed * dt);
            this.node.position = enemyPos.add(moveStep);
        }
       
        if (direction.x > 0) {
            this.node.scaleX = -Math.abs(this.node.scaleX);  
        } else  {
            this.node.scaleX = Math.abs(this.node.scaleX);
        }


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
    Distance(vec1: cc.Vec3, vec2: cc.Vec3) {
        let Distance = Math.sqrt(Math.pow(vec1.x - vec2.x, 2) +
            Math.pow(vec1.y - vec2.y, 2));
        return Distance;
    }
}
