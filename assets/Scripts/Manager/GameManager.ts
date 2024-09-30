import Singleton from "../Base/Singleton";
import Player from "../Player";
import SoundManager from "./SoundManager";
import super_html_playable from "./super_html_playable";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends Singleton<GameManager> {
    @property(cc.Prefab)
    Bone: cc.Prefab = null;
    isEnd: boolean = false;
    isStart:boolean = false;
    google_play: string = "https://play.google.com/store/apps/details?id=com.drag.dichead.survival";
    appstore: string = "";
    constructor() {
        super();
        GameManager.instance = this;
    }

    onLoad() {
        super_html_playable.set_google_play_url(this.google_play);
        super_html_playable.set_app_store_url(this.appstore);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    protected start(): void {
        //SoundManager.Instance(SoundManager).Play("BG");
    }

    replayGame() {
        cc.director.loadScene(cc.director.getScene().name);
    }
    EndGame()
    {
        super_html_playable.game_end();
    }
    Download()
    {
        super_html_playable.download();
    }
    
    spawnBone(position: cc.Vec2,scale:number) {
      if (this.Bone) {
          const boneNode = cc.instantiate(this.Bone);
          boneNode.scale=scale;
         
          this.node.parent.addChild(boneNode);
          
         
          boneNode.setPosition(position);
      } else {
          console.error("Prefab Bone chưa được gán trong Inspector");
      }
  }
  
}
