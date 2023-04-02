import { Vector } from "./vector.js";

export class Mouse {
    constructor(canvas) {
        this.pos = new Vector(-1000, -1000);

        //마우스 주변 반경 100 이내로 들어 오는 걸 체크하기 위해 
        this.radius = 100;

        canvas.onmousemove = e => this.pos.setXY(e.clientX, e.clientY);
        canvas.ontouchmove = e => this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY);
    }

}