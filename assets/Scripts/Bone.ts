

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bone extends cc.Component {

 


    start () {
this.Destroyfx;
    }
Destroyfx(){
    this.scheduleOnce(()=>{
this.node.destroy

    },1)
}
    
}
