 import GameManager from "./Manager/GameManager";


// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class JoyStick extends cc.Component {
//     @property(cc.Node)
//     private joyRing: cc.Node = null;
//     @property(cc.Node)
//     private joyDot: cc.Node = null;
//     @property(cc.Node)
//      Tut: cc.Node = null;
//     private stickPos: cc.Vec2 = null;
//     private starTouchLocation: cc.Vec2 = null;
//     private touchLocation: cc.Vec2 = null;
//     private radius: number = 0;
//     private startClick: boolean = false;

//     public dir: cc.Vec2 = cc.v2(0, 0);
//     protected start(): void {
//         this.InitEvent();
//         this.radius = this.joyRing.width / 3;
//     }
   
//     InitEvent() {
//         this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
//         this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TouchMove, this);
//         this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
//         this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd, this);
//     }
//     TouchStart(event) {
//         if(!GameManager.instance.isStart){
//             GameManager.instance.isStart= true;
//         }
//             this.Tut.active=false;
//                 this.startClick = true;
                
//             this.starTouchLocation = event.getLocation();
//             var mousePosition = event.getLocation();
//             let localMousePosition = this.node.convertToNodeSpaceAR(mousePosition);

//             this.stickPos = localMousePosition;
//             this.joyRing.setPosition(localMousePosition);
//             this.joyDot.setPosition(localMousePosition);
//             this.node.opacity = 255;
//             this.touchLocation = event.getLocation();
//         }
    
//     TouchMove(event) {
       
//             this.touchLocation = event.getLocation();
//             if (this.touchLocation === event.getLocation()) {
//                 return false;
//             }
//             let touchPos = this.joyRing.convertToNodeSpaceAR(event.getLocation());
//             let distance = touchPos.mag();
//             let posX = this.stickPos.x + touchPos.x;
//             let posY = this.stickPos.y + touchPos.y;
//              this.dir = cc.v2(posX, posY).sub(this.joyRing.getPosition()).normalize();
          
//             if (this.radius > distance) {
//                 this.joyDot.setPosition(cc.v2(posX, posY));

//             } else {
//                 let x = this.stickPos.x + this.dir.x * this.radius;
//                 let y = this.stickPos.y + this.dir.y * this.radius;
//                 this.joyDot.setPosition(cc.v2(x, y));
//             }
           

//             this.DirectionJoystick();

            
//         }
    
//     TouchEnd(event) {
//         this.dir=cc.v2(0,0);
       
//             this.joyRing.setPosition(cc.v2(0, -500));
//             this.joyDot.setPosition(this.joyRing.getPosition());
//             this.node.opacity = 0;
           
//         }
    
//     FadeOutJoyStick() {
//         this.node.opacity = 0;
//     }
//     DirectionJoystick() {
//      //   Global.stickPos = Utility.VectorsSubs(this.touchLocation, this.starTouchLocation);

//     }
// }

 const { ccclass, property } = cc._decorator;

@ccclass
export default class Joystick extends cc.Component {
    @property(cc.Node)
        Tut: cc.Node = null;
    @property(cc.Node)
    JoyDot: cc.Node = null;

    @property(cc.Node)
    JoyArea: cc.Node = null;

    @property(cc.Float)
    maxR: number = 100;

    public dir: cc.Vec2 = cc.v2(0, 0);

    onLoad() {
        this.JoyDot.setPosition(cc.v2(0, 0));
        this.JoyArea.active = false; 
        this.node.on(cc.Node.EventType.TOUCH_START, this.OnStickStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.OnStickMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.OnStickEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.OnStickEnd, this);
    }

    OnStickStart(event: cc.Touch) {
      
        if(!GameManager.instance.isStart){
                        GameManager.instance.isStart= true;
                    }
                        this.Tut.active=false;
                           // this.startClick = true;
        this.JoyArea.active = true;
        
    }

    OnStickMove(event: cc.Touch) {
        const screenPos = event.getLocation();
        const pos = this.JoyArea.convertToNodeSpaceAR(screenPos); 
        const len = pos.mag();
        if (len <= 0) {
            this.JoyDot.setPosition(pos);
            return;
        }
        this.dir.x = pos.x / len;
        this.dir.y = pos.y / len;
        if (len >= this.maxR) {
            pos.x = pos.x * this.maxR / len;
            pos.y = pos.y * this.maxR / len;
        }
        this.JoyDot.setPosition(pos);
    }

    OnStickEnd(event: cc.Touch) {
        this.dir = cc.v2(0, 0);
        this.JoyDot.setPosition(cc.v2(0, 0));

      
        this.JoyArea.active = false;
    }
}
