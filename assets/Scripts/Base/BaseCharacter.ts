

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseCharacter extends cc.Component {

    @property(cc.Integer)
    hp:number=0;
    curHp:number=0;
    @property(cc.Node)
    hpBar:cc.Node
    @property(cc.Sprite)
    slider:cc.Sprite

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
this.curHp=this.hp;
    }

    // update (dt) {}
}
