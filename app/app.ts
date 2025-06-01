import { Application, EventEmitter, Container } from "pixi.js";
import { BgController } from "../src/bg/bgController";
import { NumberFigureControlController } from "../src/numberFigureControll/numberFigureControlController";
import { HEIGHT, TControllerData, WIDTH } from "../src/utils/types";
import { BgView } from "../src/bg/bgView";
import { NumberFigureControlView } from "../src/numberFigureControll/numberFigureControlView";
import { View } from "../src/utils/view";
import {FigureController} from "../src/figure/figureController";
import {ViewFigure} from "../src/figure/viewFigure";
import {GravityController} from "../src/gravity/gravityController";
import {GravityView} from "../src/gravity/gravityView";
import {InfoController} from "../src/info/infoController";
import {SquareView} from "../src/info/squareView";

export class App extends Application {
    private eventEmitter = new EventEmitter();

    startGame(): void {
        this.stage.position.set(WIDTH / 2, HEIGHT / 2);
        this.initModules();
    }

    initModules(): void {
        this.createController(BgView, BgController);
        this.createController(NumberFigureControlView, NumberFigureControlController);
        this.createController(ViewFigure, FigureController);
        this.createController(GravityView, GravityController);
        this.createController(SquareView, InfoController);
    }

    private createController<V extends View, C>(ViewClass: new (params: { emitter: EventEmitter; parent: Container }) => V, ControllerClass: new (data: TControllerData) => C): void {
        const view = new ViewClass({
            emitter: this.eventEmitter,
            parent: this.stage,
        });

        const data: TControllerData = {
            view,
            emitter: this.eventEmitter,
        };

        new ControllerClass(data);
    }
}
