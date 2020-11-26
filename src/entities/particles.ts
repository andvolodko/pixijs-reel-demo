import * as PIXI from "pixi.js";
import particles = require("pixi-particles");
import { Entity } from "./entity";
import { GameEngine } from "../engine";
import { ParticlesConfig } from "../entities/particlesConfig";

export class Particles extends Entity {
    config: any;
    emitter?: particles.Emitter;
    particlesConfig?: ParticlesConfig;

    constructor(config: any, engine: GameEngine) {
        super(config, engine);
        this.addEmitter();
    }
    addEmitter() {
        this.particlesConfig = new ParticlesConfig(this.config);
        this.emitter = new particles.Emitter(
            this.container,
            [PIXI.Texture.from(this.config.sprite)],
            this.particlesConfig
        );
        this.emitter.emit = false;
    }
    public emitStart() {
        if (this.emitter) {
            this.emitter.emit = true;
        }
    }
    public emitStop() {
        if (this.emitter) {
            this.emitter.emit = false;
        }
    }
    update(elapsed: number) {
        super.update(elapsed);
        if (this.emitter) {
            this.emitter.update(elapsed);
        }
    }
}
