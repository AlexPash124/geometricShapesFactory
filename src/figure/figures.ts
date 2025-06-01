import {Graphics} from "pixi.js";
import {randomInteger} from "../utils/helpersFunction";
import {WIDTH} from "../utils/types";

export interface FigureWithSquare extends Graphics {
    square: number;
    isOnScene: boolean;
    offstage: boolean;
}

export function getFigures(numberFigures: number): FigureWithSquare[] {
    const listFigures: FigureWithSquare[] = [];

    for (let i = 0; i < numberFigures; i++) {
        const figure = new Graphics() as FigureWithSquare;
        const color = Math.floor(Math.random() * 0xFFFFFF);
        const centerX = 0;
        const centerY = 0;
        const radius = randomInteger(WIDTH * 0.03, WIDTH * 0.06);
        const sides = randomInteger(0, 1) ? randomInteger(-10, -1) : randomInteger(1, 10);

        figure.beginFill(color);
        figure.lineStyle(2, 0x000000);

        if (sides === 1) {
            figure.drawCircle(centerX, centerY, radius);
            figure.square = Math.PI * radius * radius; // площа кола
        } else if (sides === 2) {
            const rx = radius * randomInteger(1, 5);
            const ry = radius;
            figure.drawEllipse(centerX, centerY, rx, ry);
            figure.square = Math.PI * rx * ry; // площа еліпса
        } else if (sides < 0) {
            const steps = 100;
            const waveCount = randomInteger(2, 6);
            const distortion = radius * 0.4;
            for (let j = 0; j <= steps; j++) {
                const angle = (j / steps) * Math.PI * 2;
                const wave = Math.sin(angle * waveCount + Math.random() * 2); // хвилеподібність
                const r = radius + wave * distortion;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;

                if (j === 0) {
                    figure.moveTo(x, y);
                } else {
                    figure.lineTo(x, y);
                }
            }
            figure.closePath();
            figure.square = radius * radius * Math.PI; // Типу площа кола
        } else {
            for (let j = 0; j <= sides; j++) {
                const angle = (j / sides) * (Math.PI * 2) - Math.PI / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                if (j === 0) {
                    figure.moveTo(x, y);
                } else {
                    figure.lineTo(x, y);
                }
            }
            figure.square = (sides * radius * radius * Math.sin((2 * Math.PI) / sides)) / 2; // Площа правильного багатокутника вписаного в коло
        }
        figure.endFill();
        listFigures.push(figure);
    }

    return listFigures;
}