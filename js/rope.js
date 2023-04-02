import { Dot } from './dot.js';
import { Stick } from './stick.js';

export class Rope {
    constructor(config) {
        this.rootX = config.x;
        this.rootY = config.y;

        this.segments = config.segments || 10;
        this.gap = config.gap || 50;
        this.iterations = config.iterations || 10;

        this.dots = [];
        this.sticks = [];

        this.create();
    }

    pin(index) {
        this.dots[index].pinned = true;
    }

    checkPullingOut() {
        const dist = this.dots[0].pos.dist(this.dots[1].pos);

        if(dist / this.sticks[0].length > 1.2) {
            this.dots[0].pinned  = false;
        }
    }

    create() {
        this.dots = Array.from({length : this.segments}, (v, i) => i).map(i => 
            new Dot(this.rootX, this.rootY + i * this.gap));
        this.sticks = Array.from({length : this.segments - 1}, (v, i) => i).map(i => 
            new Stick(this.dots[i], this.dots[i + 1]));
    }

    update(mouse) {
      //  this.checkPullingOut();
        this.dots.forEach(dot => {
            dot.update(mouse);
        });

        // ����� �� ���� �ٸ� ���� ������ �ִ� �κ��� 
        // ������ �������� �� �������� �� �� ������Ʈ�� �� �ݿ����� ���� �κ��� ���� �����ӿ� ���̵� ����Ʈ�� �ݿ��� ���ɼ��� ���� 
        // �׷��� �ִ��� ���� �����ָ� �ذ�.
        for (let i = 0; i < this.iterations; i++) {
            this.sticks.forEach(stick => {
                stick.update();
            });
        }
    }

    draw(ctx) {
        this.dots.forEach(dot => {
            dot.draw(ctx);
        });
        this.sticks.forEach(stick => {
            stick.draw(ctx);
        });

        this.dots[this.dots.length - 1].drawLight(ctx);
    }
}