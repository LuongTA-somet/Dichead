
import WeaponManager from "./WeaponManager";
import BaseCharacter from "../Base/BaseCharacter";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Weapon extends cc.Component {
    weaponManager: WeaponManager = null;
    owner: BaseCharacter = null;

    start() {
  
        cc.tween(this.node)
        .repeatForever(
            cc.tween().by(2, { angle: -360 }) 
        )
        .start();
    
    }
    onCollisionEnter(other: cc.Collider): void {

        if(other.node.name=="Enemy copy"){
            this.weaponManager.score+=10;
        }
        
        
    }
    DeleteItSelf() {
        this.node.destroy();
    }
}
