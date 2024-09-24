import Weapon from "./Weapon";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(Weapon)
    weapon: Weapon = null;

    @property(cc.Node)
    item: cc.Node = null; 
    @property(cc.Node)
    item2: cc.Node = null; 
    @property(cc.Node)
    item3: cc.Node = null; 


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

     update (dt) {
        if(this.weapon.itemHit==true){
            this.Active();
        }
     }
    Active(){

        this.item.active=true;
            this.item2.active=true;
            this.item3.active=true;
    }
}
