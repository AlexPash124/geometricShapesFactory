import {TControllerData} from "./types";
import {EventEmitter} from "pixi.js";
import {View} from "./view";

export class BaseController {
    protected _view: View;
    protected _emitter: EventEmitter;

    constructor(data: TControllerData) {
        this._view = data.view;
        this._emitter = data.emitter;

        this.init();
    }

    init(): void {

    }

    protected sendNotification<T>(notification: string, data?: T): void {
        this._emitter.emit(notification, data);
    }

    protected subscribe<T>(notification: string, callback: (data: T) => void): void {
        this._emitter.on(notification, (data: T) => {
            callback(data);
        });
    }
}