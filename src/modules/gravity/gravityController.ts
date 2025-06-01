import {BaseController} from "../../utils/controller";
import {GravityView} from "./gravityView";
import {GravityNotification} from "./gravityNotification";

export class GravityController extends BaseController {
    init() {
        super.init();
        this.subscribeUINotification();
    }

    subscribeUINotification() {
        this.subscribe(GravityView.BUTTON_CLICK, (numberOfSecond) => {
            this.sendNotification(GravityNotification.CHANGE_GRAVITY, numberOfSecond);
        });
    }
}