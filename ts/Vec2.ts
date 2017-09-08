class Vec2 {
    x: number;
    y: number;

    add(other: Vec2) {
        this.x += other.x;
        this.y += other.y;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    scale(x: number, y?: number) {
        this.x *= x;

        if (y) {
            this.y *= y;
        } else {
            this.y *= x;
        }
    }

    zero() {
        this.x = 0;
        this.y = 0;
    }
}