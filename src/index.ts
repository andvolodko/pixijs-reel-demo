import "./style.css";

import { GameEngine } from "./engine";
import { Reel } from "./entities/reel";
import { Particles } from "./entities/particles";
import config from "./config.json";

const gameEngine = new GameEngine(config);

window.onload = function () {
    document.body.appendChild(gameEngine.getView());
};

//High level game logic, TODO move to state
gameEngine.on("ready", () => {
    const reel = gameEngine.getEntityByName("Reel") as Reel;
    const sparks = gameEngine.getEntityByName("Particles") as Particles;

    const spinCompleted = () => {
        console.log("spin completed!!!");
        sparks.emitStart();
    };

    gameEngine.on("spin", () => {
        console.log("spin !!!");
        reel.spin(4000, spinCompleted);
    });
});
