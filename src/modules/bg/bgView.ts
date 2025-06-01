import {View} from "../../utils/view";
import {Graphics} from "pixi.js";
import {HEIGHT, PERCENT_FILL, WIDTH} from "../../utils/types";

export class BgView extends View {
    static CLICK_TO_BG = "BgView.CLICK_TO_BG";
    protected _bg!: Graphics;

    init() {
        super.init();
        this._bg = new Graphics();
        this._bg.beginFill(0x128);
        this._bg.drawRect(0, 0, WIDTH * PERCENT_FILL, HEIGHT * PERCENT_FILL);
        this._bg.endFill();
        this._bg.pivot.set(this._bg.width / 2, this._bg.height / 2);
        this.addChild(this._bg);
        this._bg.interactive = true;
        this._bg.cursor = "pointer";

        this.addEventBgMask();
    }

    protected addEventBgMask() {
        (this._bg as Graphics).on("pointerup", (data) => {
            this.notifyToMediator(BgView.CLICK_TO_BG, this.toLocal(data.client));
        });
    }
}