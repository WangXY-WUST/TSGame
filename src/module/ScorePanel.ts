// 定义分数面板的类
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number;
    upScore: number;


    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.levelEle = document.getElementById("level")!;
        this.scoreEle = document.getElementById("score")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 提升分数的方法
    addScore() {
        this.score = this.score + 1;
        this.scoreEle.innerHTML = this.score + '';
        if (this.score % this.upScore === 0) {
            this.addlevel();
        }
    }
    // 提升等级的方法
    addlevel() {
        if (this.level < this.maxLevel) {
            this.level = this.level + 1;
            this.levelEle.innerHTML = this.level + '';
        }
    }
}

export default ScorePanel;