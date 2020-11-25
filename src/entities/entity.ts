import * as PIXI from "pixi.js";
import { GameEngine } from "../engine";

export class Entity {
    config: any;
    engine: GameEngine;
    container: PIXI.Container = new PIXI.Container();

    constructor(config: any, engine: GameEngine) {
        this.config = config;
        this.engine = engine;
        console.log("Entity: " + this.config.name);
        this.init();
    }
    init() {
        this.container.name = this.config.name;
        this.container.x = this.config.x;
        this.container.y = this.config.y;
        this.engine.getStage().addChild(this.container);
    }
}
