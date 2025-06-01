import {BaseController} from "../../utils/controller";
import {FigureNotification} from "../figure/figureNotification";
import {SquareView} from "./squareView";

export class InfoController extends BaseController {
    init() {
        super.init();
        this.subscribeNotification();
    }

    subscribeNotification() {
        this.subscribe<number>(FigureNotification.CHANGE_SQUARE, (square)=> {
            (this._view as SquareView).updateTextSquare(square);
        });

        this.subscribe<number>(FigureNotification.CHANGE_NUMBER_OF_SHAPES, (numberOfShapes)=> {
            (this._view as SquareView).updateTextCurrentShapes(numberOfShapes);
        })
    }
}