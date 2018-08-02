class Observer {
    /**
     * 判断要编译的 nodeType
     * @author Sea
     * @param {object} data 视图对象里的数据对象
     * @date 2018-07-26
     * @return viod
     */
    constructor(data) {
        this.data = data;

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        if (typeof this.data !== 'object') {
            throw new Error('参数错误，请查看注释');
        }

        Object.keys(this.data).forEach((key) => {
            this.triggerReactive(key, this.data[key]);
        });
    }

    /**
     * 触发通知响应数据
     * @author Sea
     * @param {string} key this.data对象表达式属性
     * @param {string} value this.data对象表达式属性值
     * @date 2018-07-26
     * @return viod
     */
    triggerReactive(key, value) {
        const dep = new Dep();

        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }

                return value;
            },
            set(newVal) {
                if (newVal != value) {
                    value = newVal;
                    dep.notify();
                }
            }
        })
    }
}