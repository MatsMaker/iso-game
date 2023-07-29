import { Game } from './Game';

const game = new Game();

// #if DEBUG
import { Application } from 'pixi.js';

declare global {
    interface Window {
        game: Game;
        __PIXI_APP__: Application;
    }
}
window.game = game;
window.__PIXI_APP__ = game.application;
/// #endif

window.addEventListener('load', async function () {
    game.init();
    // @ts-expect-error
    document.body.appendChild(game.view);

    await game.loadAssets();
    game.run();
});
