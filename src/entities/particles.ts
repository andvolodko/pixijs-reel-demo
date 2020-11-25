import * as PIXI from "pixi.js";
import { Entity } from "./entity";
import { GameEngine } from "../engine";
import particles = require('pixi-particles');

export class Particles extends Entity {
    config: any;

    constructor(config: any, engine: GameEngine) {
        super(config, engine);
        this.addEmitter();
    }
    addEmitter() {
        const emitterConfig: particles.EmitterConfig = {
            lifetime: new RandNumber(0, 1),
            frequency: 0,
            pos: 0

        };
        let myEmitter: particles.Emitter = new particles.Emitter(
            this.container,
            [PIXI.Texture.from(this.config.sprite)],
            emitterConfig
        );
    }
}
