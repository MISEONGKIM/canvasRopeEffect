import { Vector } from "./vector.js";

export class Mouse {
    constructor(canvas) {
        this.pos = new Vector(-1000, -1000);

        //���콺 �ֺ� �ݰ� 100 �̳��� ��� ���� �� üũ�ϱ� ���� 
        this.radius = 100;

        canvas.onmousemove = e => this.pos.setXY(e.clientX, e.clientY);
        canvas.ontouchmove = e => this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY);
    }

}