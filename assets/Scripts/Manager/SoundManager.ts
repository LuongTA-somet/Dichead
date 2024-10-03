import Singleton from "../Base/Singleton";
import Global from "../Base/Global";
const { ccclass, property } = cc._decorator;
@ccclass('Sound')
export class Sound {
    @property(cc.String)
    name: string = "";
    @property({ type: cc.AudioClip })
    clip: cc.AudioClip = null;
    @property(cc.Boolean)
    playOnLoad: boolean = false;
    @property(cc.Boolean)
    loop: boolean = false;
    @property(cc.Float)
    volume: number = 1;
    @property({ type: cc.AudioSource })
    source: cc.AudioSource = null;
}
@ccclass
export default class SoundManager extends Singleton<SoundManager> {
    @property([Sound])
    sounds: Sound[] = [];
    constructor() {
        super();
        SoundManager.instance = this;
    }
   
        extends: cc.Component
   onLoad(): void {
        cc.systemEvent.on('audioVolumeChange', this.onVolumeChange, this);
    }
    onVolumeChange(event) {
        const volumeData = event.getUserData();
        const newVolume = volumeData.volume;
        
       
        cc.audioEngine.setMusicVolume(newVolume);
        cc.audioEngine.setEffectsVolume(newVolume);
        cc.log('Volume changed to:', newVolume);
    }
    start() {
        
        this.sounds.forEach(sound => {
            sound.source = this.node.addComponent(cc.AudioSource);
            sound.source.clip = sound.clip;
            sound.source.volume = sound.volume;
            sound.source.playOnLoad = sound.playOnLoad;
            sound.source.loop = sound.loop;

            if (sound.playOnLoad) this.Play(sound.name);
        });
    }
    Play(name: string) {
        if (Global.offAllSound) return;
        var track: Sound = null;
        this.sounds.forEach(sound => {
            if (sound.name == name) {
                sound.source.stop();
                sound.source.play();
            }
        })
    }
    PauseAll() {
        this.sounds.forEach(sound => {
            sound.source.pause();
        })
    }
    ResumeAll() {
        this.sounds.forEach(sound => {
            sound.source.resume();
        })
    }

    PlayEffectSoundGameRemake(target: cc.AudioClip, loop: boolean) {
        if (!Global.offAllSound) {
            cc.audioEngine.playEffect(target, loop);
        } else {
            cc.log("Quite M<mo<de !");
        }
    }

    PlaySoundGameRemake(target: cc.AudioClip, loop: boolean, volume: number) {
        let id: number
        if (!Global.offAllSound) {
            id = cc.audioEngine.play(target, loop, volume);
        } else {
            cc.log("Quite M<mo<de !");
        }
        return id;
    }
    onDestroy () {
        cc.systemEvent.off('audioVolumeChange', this.onVolumeChange, this);
    }
}
