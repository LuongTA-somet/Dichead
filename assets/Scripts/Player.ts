import BaseCharacter from "./Base/BaseCharacter";
import Joystick from "./Joystick";
import WeaponManager from "./Weapon/WeaponManager";
import GameManager from "./Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends BaseCharacter {

   @property(Joystick)
   joystick:Joystick=null;
   @property(cc.Label)
   label:cc.Label=null;
   @property
   speed:number=100;
@property(cc.Animation)
anim:Animation=null;
 @property(WeaponManager)
   weaponManager:WeaponManager

@property(cc.Sprite)
characterSprite: cc.Sprite


 pos: cc.Vec2=cc.v2(0,0);
  

     isTweenRunning:boolean =false;


 update(dt: number) {
    if(this.curHp<=0){
   
       //cc.director.loadScene(cc.director.getScene().name);
console.log("replay");
    }
    this.pos=this.node.getPosition();
    this.slider.fillRange=this.curHp/(this.hp);
    this.label.string=this.weaponManager.score.toString();
    if (this.weaponManager.isX10 && !this.isTweenRunning) {
        this.isTweenRunning = true;  
        cc.tween(this.node)
            .to(0.5, { scaleX: 1.3, scaleY: 1.3 })
            .call(() => { this.isTweenRunning = false; })  
            .start();
    }
    if(this.weaponManager.isDestroy){
        this.isTweenRunning = true;  
        this.joystick.node.active=false;
        cc.tween(this.node)
            .to(0.5, { scaleX: 1.6, scaleY: 1.6 })
            .call(() => { this.isTweenRunning = false; })  
            .start();
            return
    }
    this.Move();
   
   
   
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

DestroyEnemyV2(){
   
   let allNodes = cc.director.getScene().children;

   
   allNodes.forEach(node => {
       if (node.name == "Enemyv2 copy") {
           node.active=false;
       }
   });
}
onCollisionEnter(other: cc.Collider): void {
if(other.node.name=="Enemy copy"){
    this.curHp--;
    console.log("hit");
}
if(other.node.name=="Enemyv2 copy"){
   if(this.weaponManager.score<1000){
    //this.anim.Play("Die");
   }
}
    
}
}

    

