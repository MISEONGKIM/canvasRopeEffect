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

        // 여기는 한 점이 다른 점에 영향을 주는 부분임 
        // 점들이 많아지면 한 프레임이 돌 때 업데이트로 다 반영되지 못한 부분이 다음 프레임에 사이드 이펙트로 반영할 가능성이 있음 
        // 그래서 최대한 많이 돌려주면 해결.
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