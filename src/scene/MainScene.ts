import { Sprite } from 'pixi.js';
import drawCircle from './drawCircle';
import Scene from './Scene';

export class MainScene extends Scene {
    constructor() {
        super();

        const circle = drawCircle();
        this.addChild(circle);

        const img = Sprite.from('background');
        this.addChild(img);
    }
}
