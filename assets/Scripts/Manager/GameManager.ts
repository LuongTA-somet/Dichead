import BaseCharacter from "../Base/BaseCharacter";
import Global from "../Base/Global";
import Singleton from "../Base/Singleton";
import Enemy from "../Enemy";
import EnemyV2 from "../EnemyV2";
import Player from "../Player";
import SoundManager from "./SoundManager";
import super_html_playable from "./super_html_playable";

declare const window: any;
const { ccclass, property } = cc._decorator;
window.addEventListener("AudioPause", function () {
    Global.offAllSound = true;
    cc.audioEngine.pauseAll();
    cc.log("Offaudio in game");
});
window.addEventListener("AudioResume", function () {
    Global.offAllSound = false;
    cc.audioEngine.resumeAll();
    cc.log("Onaudio in game");
});
@ccclass
export default class GameManager extends Singleton<GameManager> {
    @property(cc.Prefab)
    Bone: cc.Prefab = null;
    isEnd: boolean = false;
    isStart: boolean = false;
    google_play: string = "https://play.google.com/store/apps/details?id=com.drag.dichead.survival";
    appstore: string = "";

    @property(cc.Node)
    enemyParent: cc.Node = null;
    @property(cc.Node)
    enemy2Parent: cc.Node = null;


    enemyArr: Enemy[] = [];
    enemyArr2: EnemyV2[] = [];



    ironsource: boolean = false;
    mindworks: boolean = false;
    vungle: boolean = true;
    constructor() {
        super();
        GameManager.instance = this;
    }
    protected start(): void {
        if (this.mindworks)
            window.gameReady && window.gameReady();
        //SoundManager.Instance(SoundManager).Play("BG");
        for (let i = 0; i < this.enemyParent.childrenCount; i++) {
            this.enemyArr.push(this.enemyParent.children[i].getComponent(Enemy));
           
        }
        for (let i = 0; i < this.enemy2Parent.childrenCount; i++) {
            this.enemyArr2.push(this.enemy2Parent.children[i].getComponent(EnemyV2));
        }
    }
    protected update(dt: number): void {

        if (this.isStart) {
            // for (let i = 0; this.EnemyArr.length; i++) {

            //     this.EnemyArr[i].Move(dt);
            //     if (this.EnemyArr[i].rigid != null) {
            //         this.EnemyArr[i].rigid.syncPosition(true);
            //     }

            //     for (let i = 0; this.enemyArr2.length; i++) {
            //         this.enemyArr2[i].Move(dt);
            //         if (this.enemyArr2[i].rigid != null) {
            //             this.enemyArr2[i].rigid.syncPosition(true);
            //         }
            //     }
            //}
            for (let i = 0; i < this.enemyArr.length; i++) {
                this.enemyArr[i].FuncUpdate(dt, this.isStart);              
            }
            for (let i = 0; i < this.enemyArr2.length; i++) {
                this.enemyArr2[i].FuncUpdate(dt, this.isStart);
            }

        }
    }

    onLoad() {
        // super_html_playable.set_google_play_url(this.google_play);
        // super_html_playable.set_app_store_url(this.appstore);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }



    replayGame() {
        cc.director.loadScene(cc.director.getScene().name);
    }
    EndGame() {
        cc.Canvas.instance.node.getChildByName("btnAll").active = true;
        this.isEnd = true;
        if (this.mindworks) {
            window.gameEnd && window.gameEnd();
        }
        if (this.ironsource) {
            window.NUC.trigger.endGame('win')
        }
        if (this.vungle) {
            parent.postMessage('complete', '*');
        }
        // super_html_playable.game_end();
    }
    Download() {
        // super_html_playable.download();
    }

    spawnBone(position: cc.Vec2, scale: number) {
        if (this.Bone) {
            const boneNode = cc.instantiate(this.Bone);
            boneNode.scale = scale;

            this.node.parent.addChild(boneNode);


            boneNode.setPosition(position);
        } else {
            console.error("No bone");
        }
    }

}
