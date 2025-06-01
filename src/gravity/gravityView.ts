import {View} from "../utils/view";

export class GravityView extends View {
    static BUTTON_CLICK = "GravityView.BUTTON_CLICK";

    protected readonly _gravityValue = [100, 110, 120, 150, 180, 200, 250, 300, 400, 500];
    protected _indexGravityValue = 0;

    init() {
        super.init();

        this.createControlNumberFigure();
    }

    createControlNumberFigure() {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonGravityContainer');

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.id = "minusGravityButton";
        minusButton.style.opacity = "0.5";
        minusButton.onclick = () => this.clickProcessingButton(true);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.id = "plusGravityButton"
        plusButton.onclick = () => this.clickProcessingButton(false);

        const label = document.createElement("label");
        label.id = "labelGravityValue";
        label.innerHTML = "Gravity <br> value = 1";
        label.classList.add('labelContext');

        buttonContainer.appendChild(minusButton);
        buttonContainer.appendChild(plusButton);
        buttonContainer.appendChild(label);

        document.body.appendChild(buttonContainer);
    }

    clickProcessingButton(isMinus: boolean) {
        const minus = document.getElementById("minusGravityButton");
        const plus = document.getElementById("plusGravityButton");
        const label = document.getElementById("labelGravityValue");

        this._indexGravityValue += isMinus ? -1 : 1;

        if (this._indexGravityValue <= 0) {
            this._indexGravityValue = 0;
            if (minus) minus.style.opacity = "0.5";
            if (plus) plus.style.opacity = "1";
        } else if (this._indexGravityValue >= this._gravityValue.length - 1) {
            this._indexGravityValue = this._gravityValue.length - 1;
            if (plus) plus.style.opacity = "0.5";
            if (minus) minus.style.opacity = "1";
        } else {
            if (plus) plus.style.opacity = "1";
            if (minus) minus.style.opacity = "1";
        }

        if (label) label.innerHTML = "Gravity <br> value = " + (this._indexGravityValue + 1);
        this.notifyToMediator(GravityView.BUTTON_CLICK, this._gravityValue[this._indexGravityValue]);
    }
}