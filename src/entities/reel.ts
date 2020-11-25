import * as PIXI from "pixi.js";
import { Entity } from "./entity";
import { GameEngine } from "../engine";

export class Reel extends Entity {
    sprites: Array<PIXI.Sprite> = new Array<PIXI.Sprite>();
    upListener: any;

    constructor(config: any, engine: GameEngine) {
        super(config, engine);
        this.adSprites();
    }
    adSprites() {
        let y = 0;
        for (let i = 0; i < this.config.count; i++) {
            const sprite = new PIXI.Sprite();
            sprite.texture = PIXI.Texture.from(this.config.sprite);
            sprite.x = this.config.marginX;
            sprite.y = y + this.config.marginY * i;
            y += sprite.height;
            this.container.addChild(sprite);
        }
    }
}
