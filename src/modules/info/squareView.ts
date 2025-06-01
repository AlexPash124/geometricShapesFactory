import {View} from "../../utils/view";
import {Text, TextStyle} from "pixi.js";
import {HEIGHT, TViewData, WIDTH} from "../../utils/types";

export class SquareView extends View {
    protected _squareText: Text;
    protected _currentShapes: Text;

    constructor(data: TViewData) {
        super(data);

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 25,
            fontWeight: 'bold',
            fill: '#fff502',
            stroke: {color: '#ff0000', width: 1, join: 'round'},
            align: "center",
        });
        this._squareText = new Text({
            style,
            anchor: {
                x: 0,
                y: .5,
            },
        });
        this._currentShapes = new Text({
            style,
            anchor: {
                x: 0,
                y: .5,
            },
        });

        this._squareText.position.set(WIDTH / 8, -HEIGHT * .42);
        this._currentShapes.position.set(-WIDTH * .35, -HEIGHT * .42);
        this.addChild(this._squareText);
        this.addChild(this._currentShapes);
        this.updateTextSquare(0);
        this.updateTextCurrentShapes(0)
    }

    updateTextSquare(square: number) {
        this._squareText.text = "Square = " + square.toFixed(2);
    }

    updateTextCurrentShapes(square: number) {
        this._currentShapes.text = "Number of shapes = " + square;
    }
}