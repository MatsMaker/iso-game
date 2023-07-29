import { Graphics } from 'pixi.js';

export default function drawCircle(): Graphics {
    const gr = new Graphics();
    gr.beginFill(0xffffff);
    gr.drawCircle(30, 30, 30);
    gr.endFill();
    return gr;
}
