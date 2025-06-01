import {View} from "../utils/view";

export class NumberFigureControlView extends View {
    static BUTTON_CLICK = "ViewControl.BUTTON_CLICK";

    protected readonly _numbersOfSecond = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 13, 14, 15]; // Кількість фігур на секунду
    protected _indexNumbersOfSecond = 0; // індекс для numbersOfSecond

    init() {
        super.init();

        this.createControlNumberFigure();
    }

    createControlNumberFigure() {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainerNumberFigure');

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.id = "minusNumberFigureButton";
        minusButton.onclick = () => this.clickProcessingButton(true);
        minusButton.style.opacity = "0.5";

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.id = "plusNumberFigureButton"
        plusButton.onclick = () => this.clickProcessingButton(false);

        const label = document.createElement('label');
        label.innerHTML = "Number of shapes<br>per second = 1";
        label.classList.add('labelContext');
        label.id = "labelNumberOfShapes"

        buttonContainer.appendChild(minusButton);
        buttonContainer.appendChild(plusButton);
        buttonContainer.appendChild(label);

        document.body.appendChild(buttonContainer);
    }

    clickProcessingButton(isMinus: boolean) {
        const minus = document.getElementById("minusNumberFigureButton");
        const plus = document.getElementById("plusNumberFigureButton");
        const label = document.getElementById("labelNumberOfShapes");

        this._indexNumbersOfSecond += isMinus ? -1 : 1;

        if (this._indexNumbersOfSecond <= 0) {
            this._indexNumbersOfSecond = 0;
            if (minus) minus.style.opacity = "0.5";
            if (plus) plus.style.opacity = "1";
        } else if (this._indexNumbersOfSecond >= this._numbersOfSecond.length - 1) {
            this._indexNumbersOfSecond = this._numbersOfSecond.length - 1;
            if (plus) plus.style.opacity = "0.5";
            if (minus) minus.style.opacity = "1";
        } else {
            if (plus) plus.style.opacity = "1";
            if (minus) minus.style.opacity = "1";
        }

        if (label) {
            label.innerHTML = `Number of shapes<br>per second = ${this._numbersOfSecond[this._indexNumbersOfSecond]}`;
        }

        this.notifyToMediator(
            NumberFigureControlView.BUTTON_CLICK,
            this._numbersOfSecond[this._indexNumbersOfSecond]
        );
    }
}