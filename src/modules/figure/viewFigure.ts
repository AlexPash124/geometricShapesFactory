import {View} from "../../utils/view";
import {HEIGHT, PERCENT_FILL, TPoint, WIDTH} from "../../utils/types";
import {randomInteger, setAnimationTimeoutSync} from "../../utils/helpersFunction";
import {Graphics} from "pixi.js";
import {gsap} from "gsap";
import {FigureWithSquare, getFigures} from "./figures";

export class ViewFigure extends View {
    static CHANGE_SQUARE = "ViewFigure.CHANGE_SQUARE";
    static CHANGE_NUMBER_OF_SHAPES = "ViewFigure.CHANGE_NUMBER_OF_SHAPES";
    protected _startPoint: TPoint = {x: 0, y: 0};
    protected _isClick: boolean = false;
    protected _createPerSecond: number = 1;
    protected _gravityValue: number = 100;
    protected _square: number = 0;
    protected _numberOfShapes: number = 0;

    init() {
        this._startPoint = {x: 0, y: 0};
        this._isClick = false;
        this._createPerSecond = 2;
        this._gravityValue = 100;
        this._square = 0;
        this._numberOfShapes = 0;
        this.createMask();
        super.init();
        this.createFigure();
    }

    async createFigure() {
        const figures = getFigures(this._createPerSecond);
        for (let i = 0; i < figures.length; i++) {
            const figure = figures[i];
            this.addClickEventForSquare(figure);
            this.setStartPositionFigure(figure)
            this.addChild(figure);
            this.setToDown(figure);
            this._isClick = false;
            await setAnimationTimeoutSync(1 / figures.length);
        }
        this.createFigure();
    }

    setStartPositionFigure(figure: Graphics) {
        if (this._isClick) {
            let x = this._startPoint.x;
            if (this._startPoint.x < -WIDTH * (PERCENT_FILL / 2) + figure.width / 2) {
                x = -WIDTH * (PERCENT_FILL / 2) + figure.width / 2
            } else if (x > WIDTH * (PERCENT_FILL / 2) - figure.width / 2) {
                x = WIDTH * (PERCENT_FILL / 2) - figure.width / 2
            }
            figure.position.set(x, this._startPoint?.y);
        } else {
            const x = randomInteger(-WIDTH * (PERCENT_FILL / 2) + figure.width / 2, WIDTH * (PERCENT_FILL / 2) - figure.width / 2);
            const y = -HEIGHT * (PERCENT_FILL / 2) - figure.height / 2;
            figure.position.set(x, y);
        }
    }

    createMask(): void {
        const mask = new Graphics();
        mask.beginFill(0x123);
        mask.drawRect(0, 0, WIDTH * PERCENT_FILL, HEIGHT * PERCENT_FILL);
        mask.endFill();
        mask.pivot.set(mask.width / 2, mask.height / 2);
        this.addChild(mask);
        this.mask = mask;
    }


    protected setToDown(figure: FigureWithSquare) {
        const startY = figure.y;
        const endY = HEIGHT * (PERCENT_FILL / 2) + figure.height * 2;
        const distance = endY - startY;
        const duration = (distance / this._gravityValue);
        const lineY = -HEIGHT * PERCENT_FILL / 2;
        gsap.to(figure, {
            y: endY,
            duration: duration,
            ease: "expo.in",
            onStart: () => {
                figure.square
            },
            onUpdate: () => {
                if (!figure.visible) return;
                if (figure.y > lineY && !figure.isOnScene) {
                    this.changeSquareValue(figure.square, true);
                    figure.isOnScene = true;
                    figure.offstage = false;
                    this.changeNumberOfShapes(true);
                    this.notifyToMediator(ViewFigure.CHANGE_NUMBER_OF_SHAPES, this._numberOfShapes);
                }
                if (figure.y > -lineY && !figure.offstage) {
                    this.changeSquareValue(figure.square, false);
                    this.changeNumberOfShapes(false);
                    figure.offstage = true;
                }
            },
            onComplete: () => {
                figure.destroy({children: true});
            }
        });

    }

    setToStartPoint(point: TPoint) {
        this._isClick = true;
        this._startPoint = point;
    }

    setGravityValue(value: number) {
        this._gravityValue = value;
    }

    setCreatePerSecondValue(value: number) {
        this._createPerSecond = value;
    }

    addClickEventForSquare(figure: FigureWithSquare) {
        figure.interactive = true;
        figure.on("pointerup", ()=> {
            figure.visible = false;
            figure.interactive = false;
            this.changeSquareValue(figure.square, false);
            this.changeNumberOfShapes(false);
        })
    }

    changeSquareValue(value: number, isNewFigure = true) {
        if (isNewFigure) {
            this._square += value;
        } else {
            this._square -= value;
            this._square = Math.max(this._square, 0);
        }

        this.notifyToMediator(ViewFigure.CHANGE_SQUARE, this._square);
    }

    changeNumberOfShapes(isNewFigure = true) {
        if (isNewFigure) {
            this._numberOfShapes++;
        } else {
            this._numberOfShapes--;
            this._numberOfShapes = Math.max(this._numberOfShapes, 0);
        }

        this.notifyToMediator(ViewFigure.CHANGE_NUMBER_OF_SHAPES, this._numberOfShapes);
    }
}