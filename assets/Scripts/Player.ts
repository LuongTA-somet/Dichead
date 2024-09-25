import BaseCharacter from "./Base/BaseCharacter";
import Joystick from "./Joystick";
import WeaponManager from "./Weapon/WeaponManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends BaseCharacter {

   @property(Joystick)
   joystick:Joystick=null;
   @property(cc.Label)
   label:cc.Label=null;
   @property
   speed:number=100;

 @property(WeaponManager)
   weaponManager:WeaponManager

@property(cc.Sprite)
characterSprite: cc.Sprite


 pos: cc.Vec2=cc.v2(0,0);
  


onLoad() {
 

}


 update(dt: number) {
    this.Move();
    this.pos=this.node.getPosition();
    this.slider.fillRange=this.curHp/(this.hp);
    this.label.string=this.weaponManager.score.toString();
}
Move(){

    if(this.joystick.dir.x==0&& this.joystick.dir.y==0){
      
        return;
    }
    this.node.x+=this.joystick.dir.x*this.speed;
    this.node.y+=this.joystick.dir.y*this.speed;

    if (this.joystick.dir.x > 0) {
        this.characterSprite.node.scaleX = -Math.abs(this.characterSprite.node.scaleX);  
    } else {
        this.characterSprite.node.scaleX = Math.abs(this.characterSprite.node.scaleX);
    }

   
}
onCollisionEnter(other: cc.Collider): void {
if(other.node.name=="Enemy copy"){
    this.curHp--;
   
    console.log("hit")
}
if(other.node.name=="Gate"){
    other.node.destroy()
//  this.weaponManager.Active();
    
}
}
}
    

