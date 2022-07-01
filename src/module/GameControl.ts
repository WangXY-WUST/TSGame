import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 存储方向的变量
    direction: string = '';
    // 记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    // 游戏初始化方法
    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用的移动的方法
        this.run();
    }
    // 键盘按下的函数回调
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key
    }
    // 控制蛇移动的方法（根据方向，修改蛇的top值或者left值）
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            // 向上移动
            case "ArrowUp":
                Y -= 10;
                break;
            case "ArrowDown":
                Y += 10;
                break;
            case "ArrowLeft":
                X -= 10;
                break;
            case "ArrowRight":
                X += 10;
                break;
        }
        // 如果蛇的坐标等于食物 的坐标，那就是吃到食物了
        if(this.checkEat(X , Y)) {
            // 修稿食物的位置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        }
        // 把移动后的坐标赋值给蛇
        try {
            // 如果蛇没撞墙，就赋新值
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e:any) {//如果蛇撞墙了，snake类中就会抛出错误，这里可以捕获，然后进行提醒用户
            alert(e.message + 'GAME OVER');
            this.isLive = false;
        }
        // 开启定时器，因为不开启定时器，蛇不会动,只有isLive属性为真，即蛇还活着的时候可以移动
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }
    // 判断蛇吃到食物
    checkEat(X:number , Y:number) {
        return X ===this.food.X && Y === this.food.Y;
    }
}

export default GameControl;