import WeaponManager from "../Weapon/WeaponManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EnableEngine extends cc.Component {
@property(cc.Canvas)
canvas:cc.Canvas =null;
@property(WeaponManager)
weaponManager:WeaponManager=null;
isTweenRunning:boolean =false;
isTweenRunning2:boolean =false;
protected update(dt: number): void {
     
    // if (this.weaponManager.isX10 && !this.isTweenRunning) {
    //     this.isTweenRunning = true;  
    //     setTimeout(() => {
    //         cc.tween(this.canvas.node)
    //         .to(1, { scaleX: 0.75, scaleY: 0.75 })
    //         .call(() => { this.isTweenRunning = false; })  
    //         .start();
    //     }, 700);
    
    // }
       
    // if (this.weaponManager.isDestroy&& !this.isTweenRunning2) {
    //     this.isTweenRunning = true;  
    //     setTimeout(() => {
    //         cc.tween(this.canvas.node)
    //         .to(0.5, { scaleX: 0.45, scaleY: 0.45 })
    //         .call(() => { this.isTweenRunning2 = false; })  
    //         .start();
    //     }, 700);
     
    // }
}
    onLoad () { 
        cc.macro.ENABLE_MULTI_TOUCH = false;
        cc.director.getCollisionManager().enabled = true;
    }
}
