import { Entity } from "./entities/entity";
import { Button } from "./entities/button";
import { Reel } from "./entities/reel";
import { FPS } from "./entities/fps";
import { Particles } from "./entities/particles";
import { GameEngine } from "./engine";

export class Utils {
    static createEntity(config: any, engine: GameEngine): Entity {
        switch (config.entity) {
            case "Button": {
                return new Button(config, engine);
            }
            case "Reel": {
                return new Reel(config, engine);
            }
            case "FPS": {
                return new FPS(config, engine);
            }
            case "Particles": {
                return new Particles(config, engine);
            }
        }
        return new Entity(config, engine);
    }
}
