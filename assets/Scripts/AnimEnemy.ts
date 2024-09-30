// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimEnemy extends cc.Component {

  

    time: number = 0;
    anim: cc.Animation = null;
    start() {
        this.anim = this.node.children[0].children[0].getComponent(cc.Animation);
        this.anim.play("Boss").speed = this.anim.play("Boss").speed * (1 - Math.random());
        this.anim.play("Boss");
    }


    // update (dt) {}
}
