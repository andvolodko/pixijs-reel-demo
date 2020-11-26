import * as PIXI from "pixi.js";
import { Entity } from "./entity";
import { GameEngine } from "../engine";

export class FPS extends Entity {
    label?: PIXI.Text;
    upListener: any;

    constructor(config: any, engine: GameEngine) {
        super(config, engine);
        this.addtext();
    }
    addtext() {
        this.label = new PIXI.Text("");
        this.container.addChild(this.label);
    }
    update(elapsed: number) {
        super.update(elapsed);
        if (this.label) {
            this.label.text = "FPS: " + Math.round(PIXI.Ticker.shared.FPS);
        }
    }
}
