
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onLoad () { 
        cc.macro.ENABLE_MULTI_TOUCH = false;
        cc.director.getCollisionManager().enabled = true;
    }
}
