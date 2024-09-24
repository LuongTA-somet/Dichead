

const {ccclass, property} = cc._decorator;

@ccclass
export default class Weapon extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null; 


itemHit=false;
    start() {
  
        cc.tween(this.node)
        .repeatForever(
            cc.tween().by(2, { angle: -360 }) 
        )
        .start();
    
    }
    onCollisionEnter(other: cc.Collider): void {

        if(other.node.name=="Enemy"){
            other.node.destroy();
        }
        
        if(other.node.name=="Item"){
            other.node.destroy()
          this.itemHit=true
            
        }
    }
}
