import particles = require("pixi-particles");

export class ParticlesConfig implements particles.EmitterConfig {
    config: any;
    alpha?: particles.ValueList<number>;
    speed?: particles.ValueList<number>;
    minimumSpeedMultiplier?: number;
    maxSpeed?: number;
    acceleration?: { x: number; y: number };
    scale?: particles.ValueList<number>;
    minimumScaleMultiplier?: number;
    color?: particles.ValueList<string>;
    startRotation?: particles.RandNumber;
    noRotation?: boolean;
    rotationSpeed?: particles.RandNumber;
    rotationAcceleration?: number;
    lifetime: particles.RandNumber;
    blendMode?: string;
    ease?: particles.SimpleEase | particles.EaseSegment[];
    extraData?: any;
    particlesPerWave?: number;
    spawnType?: string;
    spawnRect?: { x: number; y: number; w: number; h: number };
    spawnCircle?: { x: number; y: number; r: number; minR?: number };
    particleSpacing?: number;
    angleStart?: number;
    spawnPolygon?: particles.BasicPoint[] | particles.BasicPoint[][];
    frequency;
    spawnChance?: number;
    emitterLifetime?: number;
    maxParticles?: number;
    addAtBack?: boolean;
    pos: { x: number; y: number };
    emit?: boolean;
    autoUpdate?: boolean;
    orderedArt?: boolean;

    constructor(config: any) {
        this.config = config;

        // TODO Move values to config
        this.alpha = new ValueList([
            { value: 1, time: 0 },
            { value: 0.5, time: 1 },
        ]);
        this.speed = new ValueList([
            { value: 500, time: 0 },
            { value: 100, time: 1 },
        ]);
        this.scale = new ValueList([
            { value: 0.6, time: 0 },
            { value: 0.3, time: 1 },
        ]);
        this.startRotation = { min: 0, max: 360 };
        this.rotationSpeed = { min: 0, max: 150 };
        this.lifetime = { min: 0.5, max: 0.7 };
        this.frequency = 0.05;
        this.emitterLifetime = 0.5;
        this.maxParticles = 1000;
        this.spawnType = "ring";
        this.spawnCircle = { x: 0, y: 0, r: 50, minR: 30 };
        this.pos = { x: 0, y: 0 };
    }
}

class ValueList implements particles.ValueList<number> {
    list: particles.ValueStep<any>[];
    isStepped?: boolean | undefined;
    ease?: particles.SimpleEase | particles.EaseSegment[] | undefined;

    constructor(list: particles.ValueStep<any>[]) {
        this.list = list;
    }
}
