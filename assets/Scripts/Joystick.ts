
const { ccclass, property } = cc._decorator;


@ccclass
export default class Joystick extends cc.Component {

    @property(cc.Node)
    JoyDot: cc.Node =null;
    @property(cc.Node)
    JoyArea: cc.Node =null;
@property(cc.Float)
maxR: number =100;


public dir: cc.Vec2=cc.v2(0,0);

     onLoad() {
        this.JoyDot.setPosition(cc.v2(0,0));
        this.node.on(cc.Node.EventType.TOUCH_START,this.OnStickStart,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.OnStickMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.OnStickEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.OnStickEnd,this);
    }
OnStickStart(event){



}
OnStickMove(event: cc.Touch){
 
const screenPos=event.getLocation();
const pos=this.node.convertToNodeSpaceAR(screenPos);
const len =pos.mag();
if(len<=0){
    this.JoyDot.setPosition(pos);
    return;
}
this.dir.x=pos.x/len;
this.dir.y=pos.y/len;
if(len>=this.maxR){
    pos.x=pos.x*this.maxR/len;
    pos.y=pos.y*this.maxR/len;
}
this.JoyDot.setPosition(pos);
    }
   
    OnStickEnd(event: cc.Touch){
        this.dir=cc.v2(0,0);
this.JoyDot.setPosition(cc.v2(0,0));

    }
}
