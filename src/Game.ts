import { Application, Container, ICanvas } from 'pixi.js';
import { MainScene } from './scene/MainScene';
import Scene from './scene/Scene';
import { AssetsLoader } from './AssetsLoader';

export class Game {
    // public only for debug
    application: Application;

    get stage(): Container {
        return this.application.stage;
    }

    get view(): ICanvas {
        return this.application.view;
    }

    init(): ICanvas {
        this.application = new Application({
            resizeTo: window,
            backgroundColor: '0xfff000',
        });
        return this.application.view;
    }

    useScene(scene: Scene): void {
        this.stage.removeChildren();
        this.stage.addChild(scene);
    }

    async loadAssets(): Promise<void> {
        const assetsCtrl = new AssetsLoader();
        return assetsCtrl.load();
    }

    run(): void {
        const mainScene = new MainScene();
        this.useScene(mainScene);
    }
}
