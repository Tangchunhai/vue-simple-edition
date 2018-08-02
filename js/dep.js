class Dep {
    constructor() {
        this.subArr = [];
    }

    /**
     * 添加订阅到订阅者列表
     * @author Sea
     * @param {string} sub 订阅者
     * @date 2018-07-30
     * @return viod
     */
    addSub(sub) {
        this.subArr.push(sub);
    }

    /**
     * 通知更新
     */
    notify() {
        this.subArr.forEach((sub) => {
            sub.update();
        });
    }
}

Dep.target = null;