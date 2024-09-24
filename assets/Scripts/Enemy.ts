// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)  
    player: cc.Node = null;

    @property
    speed: number = 200;  
@property(cc.Integer)
hp:number=1;
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

        
        let moveStep = direction.mul(this.speed * dt);
        this.node.position = enemyPos.add(moveStep);

        let distance = playerPos.sub(enemyPos).mag();
// if (distance > 10) {

//     let moveStep = direction.mul(this.speed * dt);
//     this.node.position = enemyPos.add(moveStep);
// }

    }
}
