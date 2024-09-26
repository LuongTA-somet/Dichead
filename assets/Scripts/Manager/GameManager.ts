import Singleton from "../Base/Singleton";
import SoundManager from "./SoundManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends Singleton<GameManager> {
@property(cc.Prefab)

isEnd:boolean=false;
constructor(){
super()
GameManager.instance=this;
}
     onLoad () {
       
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;

     }
protected start(): void {
   SoundManager.Instance(SoundManager).Play("BG");
}


replayGame() {

   cc.director.loadScene(cc.director.getScene().name);
}
    }

   
     

