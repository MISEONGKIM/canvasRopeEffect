import { Vector } from "./vector.js";

export class Dot {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.oldPos = new Vector(x, y);

        this.gravity = new Vector(0, 0.6);
        this.friction = 0.97;

        this.pinned = false;

        this.mass = 1;

        this.lightImg = document.querySelector('#light-img');
        this.lightSize = 15;
    }

    update(mouse) {
        if (this.pinned) return;
        //속도, 현재 프러임위치에서 이전 프레임위치  뺀 값
        let vel = Vector.sub(this.pos, this.oldPos);
        
        this.oldPos.setXY(this.pos.x, this.pos.y);


        vel.mul(this.friction);
        vel.add(this.gravity);

        const { x : dx, y : dy } = Vector.sub(mouse.pos,this.pos);
        //마우스포인트와 점의 거리
        const dist = Math.sqrt(dx * dx + dy * dy);
        //방향벡터
        const directionV = new Vector(dx / dist, dy / dist);
        const force = Math.max((mouse.radius - dist) / mouse.radius, 0);

        //힘을 크게 받으면 마우스에 붙도록
        if (force > 0.8) {
            this.pos.setXY(mouse.pos.x, mouse.pos.y);    
            return;
        } 
        
       this.pos.add(vel);
       this.pos.add(directionV.mul(force).mul(3));
    }

    draw(ctx) {
        ctx.fillStyle = '#999';
        ctx.fillRect(this.pos.x - this.mass, this.pos.y - this.mass, this.mass * 2, this.mass * 2);
    }

    drawLight(ctx) {
        ctx.drawImage(this.lightImg,
            this.pos.x - this.lightSize / 2,
            this.pos.y - this.lightSize / 2,
            this.lightSize,    
            this.lightSize,    
        );
    }
}