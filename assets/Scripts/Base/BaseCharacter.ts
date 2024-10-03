

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseCharacter extends cc.Component {

    @property(cc.Integer)
    hp:number=0;
    curHp:number=0;
    @property(cc.Node)
    hpBar:cc.Node =null;
    @property(cc.Sprite)
    slider:cc.Sprite=null;



    start () {
this.curHp=this.hp;
    }

   
}
