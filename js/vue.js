class Vue {
    constructor(options) {
        this.el = options.el;
        this.data = options.data;
        this.methods = options.methods;

        // 初始化
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 代理拦截data对象属性
        Object.keys(this.data).forEach(key => {
            this.proxy(key);
        });

        // 监听data对象
        new Observer(this.data);

        // 模板编译
        new Compile(this.el, this);
    }

    /**
     * 代理
     */
    proxy(key) {
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get() {
                console.log('取值操作' + this.data[key]);
                return this.data[key];
            },
            set(newVal) {
                console.log('赋值操作' + newVal);
                this.data[key] = newVal;
            }
        });
    }
}