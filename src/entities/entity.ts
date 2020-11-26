import * as PIXI from "pixi.js";
import { GameEngine } from "../engine";

export class Entity {
    config: any;
    engine: GameEngine;
    container: PIXI.Container = new PIXI.Container();
    public name?: string;

    constructor(config: any, engine: GameEngine) {
        this.config = config;
        this.engine = engine;
        console.log("Entity: " + this.config.name);
        this.init();
    }
    init() {
        this.name = this.config.name;
        this.container.name = this.config.name;
        this.container.x = this.config.x;
        this.container.y = this.config.y;
        this.engine.getStage().addChild(this.container);
    }
    update(elapsed: number) {
        //Update
    }
    resize(width: number, height: number, scale: number) {
        if (this.config.halign) {
            switch (this.config.halign) {
                case "left":
                    this.container.x = 0 + this.config.x;
                    break;
                case "right":
                    this.container.x = width / scale - this.container.width + this.config.x;
                    break;
                case "center":
                    this.container.x = width / scale / 2 - this.container.width / 2 + this.config.x;
                    break;
            }
        }
        if (this.config.valign) {
            switch (this.config.valign) {
                case "top":
                    this.container.y = 0 + this.config.y;
                    break;
                case "bottom":
                    this.container.y = height / scale - this.container.height + this.config.y;
                    break;
                case "center":
                    this.container.y = height / scale / 2 - this.container.height / 2 + this.config.y;
                    break;
            }
        }
    }
}
