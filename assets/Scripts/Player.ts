import Joystick from "./Joystick";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

   @property(Joystick)
   joystick:Joystick=null;
   @property
   speed:number=100;
@property(cc.Integer)
hp:number=10
 pos: cc.Vec2=cc.v2(0,0);
  


onLoad() {
 
    cc.director.getCollisionManager().enabled = true;
}


 update(dt: number) {
    this.Move();
    this.pos=this.node.getPosition();
}
Move(){

    if(this.joystick.dir.x==0&& this.joystick.dir.y==0){
      
        return;
    }
    this.node.x+=this.joystick.dir.x*this.speed;
    this.node.y+=this.joystick.dir.y*this.speed;

   
}
onCollisionEnter(other: cc.Collider): void {

   
}
}
    

