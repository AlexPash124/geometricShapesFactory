import {gsap} from "gsap";

export function setAnimationTimeoutSync(timeout: number): Promise<void> {
    return new Promise<void>(resolve => {
        gsap.to({x: 0}, {
            duration: timeout,
            x: 1,
            onComplete: resolve
        })
    });
}

export function randomInteger(min: number, max: number): number {
    const rand: number = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}