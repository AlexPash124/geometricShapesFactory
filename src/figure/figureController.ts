import {BaseController} from "../utils/controller";
import {BgNotification} from "../bg/notification";
import {ViewFigure} from "./viewFigure";
import {TPoint} from "../utils/types";
import {NumberFigureControlNotification} from "../numberFigureControll/numberFigureControlNotification";
import {GravityNotification} from "../gravity/gravityNotification";
import {FigureNotification} from "./figureNotification";

export class FigureController extends BaseController {
    init() {
        super.init();
        this.subscribeUINotification();
        this.subscribeNotification();
    }

    subscribeUINotification() {
        this.subscribe(ViewFigure.CHANGE_SQUARE, (square)=> {
            this.sendNotification(FigureNotification.CHANGE_SQUARE, square);
        });

        this.subscribe<number>(ViewFigure.CHANGE_NUMBER_OF_SHAPES, (numberOfShapes)=> {
            this.sendNotification<number>(FigureNotification.CHANGE_NUMBER_OF_SHAPES, numberOfShapes);
        })
    }

    subscribeNotification() {
        this.subscribe(BgNotification.CLICK_TO_BG, (point) => {
            (this._view as ViewFigure).setToStartPoint(point as TPoint);
        })

        this.subscribe(NumberFigureControlNotification.CHANGE_NUMBER_FIGURE, (numberOfSecond) => {
            (this._view as ViewFigure).setCreatePerSecondValue(numberOfSecond as number);
        });

        this.subscribe(GravityNotification.CHANGE_GRAVITY, (gravityValue) => {
            (this._view as ViewFigure).setGravityValue(gravityValue as number);
        });
    }
}