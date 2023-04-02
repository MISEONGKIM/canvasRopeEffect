import { Rope, Mouse } from './index.js';
import { randomNumberBetween } from './utils.js';

export class App {
    static width = innerWidth;
    static height = innerHeight;
    static dpr = devicePixelRatio > 1 ? 2 : 1;
    static interval = 1000 / 60;

    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.preTime = Date.now();

        this.resize();
        //addEventListener�� �Լ��� ���ڷ� �޴� �����Լ�, this.resize�� �Ѱ��ָ� ����� �� 
        // this�� widow�� �ǹǷ� bind ������Ѵ�.
        window.addEventListener('resize', this.resize.bind(this));
        this.mouse = new Mouse(this.canvas);
    }

    resize() {
        App.width = innerWidth;
        App.height = innerHeight;

        this.canvas.style.width = App.width + 'px';
        this.canvas.style.height = App.height + 'px';

        this.canvas.width = App.width * App.dpr;
        this.canvas.height = App.height * App.dpr;
        this.ctx.scale(App.dpr, App.dpr);

        this.initRopes();
    }

    initRopes() {
        this.ropes = Array.from({length :App.width * 0.06 }, (v, i) => i).map(i => {
            const rope = new Rope({ 
                    x : randomNumberBetween(App.width * 0.3, App.width * 0.7),
                    y : 0,
                    gap : randomNumberBetween(App.height * 0.05, App.height * 0.08)
                });
            //ù��° ���� ������ ����
            rope.pin(0);
            return rope;
        });
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this));
        const now = Date.now();
        if (now - this.preTime < App.interval) return;
        this.exec();
        this.preTime = now - ((now - this.preTime) % App.interval);
    }

    exec() {
        this.ctx.clearRect(0, 0, App.width, App.height);
        this.ropes.forEach(rope => {
            rope.update(this.mouse);
            rope.draw(this.ctx);
        });
    }
}