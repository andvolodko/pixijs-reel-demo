import * as PIXI from "pixi.js";
import Fatina from "fatina";
import { Entity } from "./entity";
import { GameEngine } from "../engine";

export class Reel extends Entity {
    public velocity = 0;
    sprites: Array<PIXI.Sprite> = new Array<PIXI.Sprite>();
    upListener: any;
    completeCallback: any;
    spinning = false;
    maxHeight = 0;
    symbolHeight = 0;
    time = 0;

    constructor(config: any, engine: GameEngine) {
        super(config, engine);
        this.addSprites();
        this.addMask();
        this.checkSymbolsOverflow();
    }
    addSprites() {
        let y = 0;
        for (let i = 0; i < this.config.count + 1; i++) {
            const sprite = new PIXI.Sprite();
            sprite.name = "Symbol" + i;
            sprite.texture = PIXI.Texture.from(this.config.sprite);
            sprite.x = this.config.marginX;
            sprite.y = y + this.config.marginY * i;
            y += sprite.height;
            this.sprites.push(sprite);
            this.container.addChild(sprite);
        }
        this.symbolHeight = this.sprites[0].height;
        this.maxHeight = this.symbolHeight * (this.config.count - 1) + this.config.marginY;
    }
    addMask() {
        if (this.config.mask) {
            const mask = new PIXI.Graphics();
            mask.beginFill(0, 1);
            mask.drawRect(this.config.mask.x, this.config.mask.y, this.config.mask.width, this.config.mask.height);
            mask.endFill();
            this.container.mask = mask;
            this.container.addChild(mask);
        }
    }
    public spin(time: number, completeCallback: any) {
        this.time = time;
        this.completeCallback = completeCallback;
        if (!this.spinning) {
            this.spinning = true;
            Fatina.tween(this)
                .to({ velocity: this.config.velocity }, this.config.delayStart)
                .setEasing("inOutBack")
                .onComplete(this.spinStarted.bind(this))
                .start();
        }
    }
    spinStarted() {
        console.log("spinStarted");
        const rollingTime = this.time - this.config.delayStart - this.config.delayEnd;
        Fatina.tween(this)
            .to({ velocity: this.config.velocity }, rollingTime)
            .onComplete(this.spinEnd.bind(this))
            .start();
    }
    spinEnd() {
        console.log("spinEnd");
        Fatina.tween(this)
            .to({ velocity: 0 }, this.config.delayEnd)
            .setEasing("inOutBack")
            .onComplete(this.spinComplete.bind(this))
            .start();
    }
    spinComplete() {
        if (this.completeCallback !== undefined) {
            this.completeCallback();
        }
        this.spinning = false;
    }
    update(elapsed: number) {
        super.update(elapsed);
        if (this.spinning) {
            for (let i = 0; i < this.sprites.length; i++) {
                const sprite = this.sprites[i];
                sprite.y += this.velocity;
                this.checkSymbolOverflow(sprite);
            }
        }
    }
    checkSymbolsOverflow() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.checkSymbolOverflow(this.sprites[i]);
        }
    }
    checkSymbolOverflow(sprite: PIXI.Sprite) {
        if (sprite.y > this.maxHeight) {
            const firstSymbol = this.sprites[0];
            sprite.y = firstSymbol.y - this.symbolHeight - this.config.marginY;
            this.sortSymbols();
            this.container.addChildAt(sprite, 0);
        }
    }
    sortSymbols() {
        this.sprites.sort((a, b) => {
            if (a.y > b.y) {
                return 1;
            }
            if (a.y < b.y) {
                return -1;
            }
            return 0;
        });
    }
}
