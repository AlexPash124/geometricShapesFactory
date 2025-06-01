import {Container, EventEmitter} from "pixi.js";
import {TViewData} from "./types";

export class View extends Container {
    protected _emitter: EventEmitter;
    protected parentContainer: Container;

    constructor(data: TViewData) {
        super();
        this._emitter = data.emitter;
        this.parentContainer = data.parent;
        this.parentContainer.addChild(this as Container);
        this.parent = data.parent;
        this.init();
    }

    init(): void {

    }
    notifyToMediator<T>(notification: string, data?: T): void {
        this._emitter.emit(notification, data);
    }
}