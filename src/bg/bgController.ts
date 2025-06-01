import {BaseController} from "../utils/controller";
import {BgView} from "./bgView";
import {BgNotification} from "./notification";
import {TPoint} from "../utils/types";

export class BgController extends BaseController {
    init() {
        super.init();
        this.catchNotification();
    }

    catchNotification() {
        this.subscribe(BgView.CLICK_TO_BG, (point) => {
            this.sendNotification(BgNotification.CLICK_TO_BG, point);
        })
    }
}