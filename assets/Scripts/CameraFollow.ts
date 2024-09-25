import Singleton from "./Base/Singleton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraFollower extends Singleton<CameraFollower> {
    @property(cc.Camera)
    camera: cc.Camera = null;

    @property(cc.Node)
    obj: cc.Node = null;
    @property(cc.Vec2)
    offset: cc.Vec2 = cc.v2(0, 0);
    following: boolean = false;
    constructor() {
        super();
        CameraFollower.instance = this;
    }
    protected start(): void {
        this.following = true;
        this.offset = cc.v2(this.node.position.x - this.obj.position.x, this.node.position.y - this.obj.position.y);
    }
    update(dt: number) {
       
            if (this.following && this.obj != null) {
                this.SetInstantPos(dt);
            
        }
    }
    SetInstantPos(dt: number) {
        this.node.x = cc.misc.lerp(this.node.x, this.obj.x + this.offset.x, 0.1);
        let posY = cc.misc.clampf(this.obj.y + this.offset.y, -3100, 3100);
        this.node.y = cc.misc.lerp(this.node.y, posY, 0.1);

    }


   

}
