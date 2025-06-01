import {Container, EventEmitter} from "pixi.js";
import {View} from "./view";

export type TControllerData = {
    emitter: EventEmitter,
    view: View,
};

export type TViewData = {
    emitter: EventEmitter,
    parent: Container,
};

export const PERCENT_FILL = .8
export const WIDTH = window.innerWidth;
export const HEIGHT = window.innerHeight;

export enum EFigureType {
    GEOMETRIC,
    FREEFORM
}

export type TPoint = {
    x: number,
    y: number,
};