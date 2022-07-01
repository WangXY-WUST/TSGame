// 定义食物类
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor() {
        // 获取页面中的food元素，并赋值给element ， 后面加个！说明这个元素一定存在，不会为空
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取x轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    // 定义一个获取y轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }
    // 修改食物位置的方法
    change() {
        // 蛇每次移动10px，所以食物的位置必须是10 的倍数    
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;