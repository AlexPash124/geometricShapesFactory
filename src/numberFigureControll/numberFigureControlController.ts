import {BaseController} from "../utils/controller";
import {NumberFigureControlView} from "./numberFigureControlView";
import {NumberFigureControlNotification} from "./numberFigureControlNotification";

export class NumberFigureControlController extends BaseController {
    init() {
        super.init();
        this.subscribeUINotification();
    }

    subscribeUINotification() {
        this.subscribe(NumberFigureControlView.BUTTON_CLICK, (numberOfSecond) => {
            this.sendNotification(NumberFigureControlNotification.CHANGE_NUMBER_FIGURE, numberOfSecond);
        });
    }
}