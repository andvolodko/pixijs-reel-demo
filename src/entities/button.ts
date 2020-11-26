import * as PIXI from "pixi.js";
import { Entity } from "./entity";
import { GameEngine } from "../engine";

export class Button extends Entity {
    sprite: PIXI.Sprite = new PIXI.Sprite();
    upListener: any;

    constructor(config: any, engine: GameEngine) {
        super(config, engine);
        this.setSprite();
        this.addListeners();
    }
    setSprite() {
        this.sprite.texture = PIXI.Texture.from(this.config.sprite);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.container.addChild(this.sprite);
    }
    addListeners() {
        this.upListener = this.onUp.bind(this);
        this.sprite.on("pointerup", this.upListener);
    }
    removeListeners() {
        this.sprite.off("pointerup", this.upListener);
    }
    onUp(data: any) {
        console.log("Button: Up");
        this.engine.sendEvent(this.config.event);
    }
}
