import * as PIXI from "pixi.js";
import { Entity } from "./entity";
import { GameEngine } from "../engine";

export class FPS extends Entity {
    label: PIXI.Text = new PIXI.Text("");
    upListener: any;

    constructor(config: any, engine: GameEngine) {
        super(config, engine);
        this.addtext();
    }
    addtext() {
        this.label.text = "FPS: 120";
        this.container.addChild(this.label);
    }
}
