import {App} from "../app/app";
declare global {
    var __PIXI_APP__: App;
}
export {};

const app = new App()
await app.init({
    background: '#123',
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio || 1,
    resizeTo: window,
});
app.startGame();
document.body.appendChild(app.canvas);

globalThis.__PIXI_APP__ = app;
