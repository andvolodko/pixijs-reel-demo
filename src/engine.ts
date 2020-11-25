import * as PIXI from "pixi.js";
import { Entity } from "./entities/entity";
import { Utils } from "./utils";

export class GameEngine {
    config: any;
    pixiApplication: PIXI.Application;
    resizeCallback: any;
    resourceLoadedCallback: any;
    viewItems: Array<Entity> = [];

    constructor(config: any) {
        this.config = config;
        this.pixiApplication = new PIXI.Application(config.pixiConfig);

        this.parseConfig();
        this.loadResources();
        this.addListeners();

        this.resize();
    }
    addListeners() {
        this.resizeCallback = this.resize.bind(this);
        window.addEventListener("resize", this.resizeCallback);
    }
    removeListeners() {
        window.removeEventListener("resize", this.resizeCallback);
    }
    destroy() {
        this.removeListeners();
    }
    getView() {
        return this.pixiApplication.renderer.view;
    }
    getStage() {
        return this.pixiApplication.stage;
    }
    parseConfig() {
        console.log(this.config);
        console.log("GameEngine: Config parsed");
    }
    loadResources() {
        this.config.resources.forEach((res: any) => {
            this.pixiApplication.loader.add(res.path);
        });
        this.resourceLoadedCallback = this.resourceLoaded.bind(this);
        this.pixiApplication.loader.load(this.resourceLoadedCallback);
        console.log("GameEngine: Load resource");
    }
    resourceLoaded() {
        console.log("GameEngine: Resources loaded");
        this.createView();
    }
    createView() {
        this.config.view.forEach((item: any) => {
            if (item.entity !== "undefined" && item.entity) {
                console.log(item);
                this.viewItems.push(Utils.createEntity(item, this));
            }
        });
        console.log("GameEngine: View created");
    }
    resize() {
        this.pixiApplication.renderer.resize(window.innerWidth, window.innerHeight);
        const scale = Math.min(
            window.innerWidth / this.config.pixiConfig.width,
            window.innerHeight / this.config.pixiConfig.height
        );
        this.pixiApplication.stage.scale.x = scale;
        this.pixiApplication.stage.scale.y = scale;
        console.log("GameEngine: resize");
    }
    sendEvent(event: string) {
        console.log(event);
    }
}
