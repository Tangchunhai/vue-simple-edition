class Watcher {
    constructor(vm, exp, callback) {
        this.vm = vm;
        this.exp = exp;
        this.callback = callback;
        this.value = '';

        this.get();
    }

    /**
     * 将表达式写入订阅列表
     */
    get() {
        Dep.target = this;
        const value = this.vm.data[this.exp.trim()];
        Dep.target = null;
    }

    /**
     * 将表达式写入订阅列表
     */
    update() {
        const newVal = this.vm.data[this.exp.trim()];

        if (newVal !== this.value) {
            this.value = newVal;
            this.callback.call(this.vm, newVal);
        }
    }
}