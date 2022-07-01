class Snake {
    // 蛇头元素
    head: HTMLElement;
    // 蛇身（包括蛇头）
    bodies: HTMLCollection;
    // 获取蛇的容器
    snake: HTMLElement;

    constructor() {
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.snake = document.getElementById('snake')!;
    }

    // 获取蛇的坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    // 设置蛇的坐标
    set X(value: number) {
        // 因为同时只能改变一个坐标，如果X没变，就直接返回，不用执行下面的.
        if (this.X === value) return;
        // 蛇撞墙了
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }
        // 禁止掉头,如果存在第二节，且第二节的位置和下次头的位置相同，则说明是掉头了
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果是向右走，准备向左掉头
            if (this.X > value) {
                // 就让他继续向右走
                value = this.X + 10
            } else {
                value = this.X - 10
            }
        }
        // 移动身体
        this.moveBody();
        // 移动头
        this.head.style.left = value + 'px';
        // 检查有没有撞自己
        this.checkCrash();
    }
    set Y(value: number) {
        console.log(this);
        
        if (this.Y === value) return;
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }
        // 禁止掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果是向下走，准备向上掉头
            if (this.Y > value) {
                // 就让他继续向下走
                value = this.Y + 10
            } else {
                value = this.Y - 10
            }
        }
        // 移动身体
        this.moveBody();
        // 移动头
        this.head.style.top = value + 'px';
        this.checkCrash();
    }
    // 增加身体
    addBody() {
        this.snake.insertAdjacentHTML("beforeend", "<div></div>")
    }
    /* 
    身体的移动,不加这个，移动的只有蛇头
    让后面的身体移动到前面的身体那一格
    并且让后面的先动，因为前面的先动，他的位置就直接丢失了
    */
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }
    }
    // 检查是否碰撞
    checkCrash() {
        for(let i = 1; i < this.bodies.length; i++) {
            if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                // 说明发生碰撞
                throw new Error("发生碰撞了");
            }
        }
    }
}

export default Snake;