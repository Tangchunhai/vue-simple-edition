// 判断 nodeType 类型对象
const nodeType = {
    isElement(node) {
        return node.nodeType === 1;
    },
    isText(node) {
        return node.nodeType === 3;
    }
}

// 更新语法对象
const update = {
    /**
     * 判断要编译的 nodeType
     * @author Sea
     * @param {string} node DOM节点
     * @param {string} value 表达式的值
     * @date 2018-07-25
     * @return viod
     */
    text(node, value) {
        node.textContent = value;
    }
}

class Compile {
    /**
     * 判断要编译的 nodeType
     * @author Sea
     * @param {string} el DOM的ID
     * @param {object} vm 视图对象
     * @date 2018-07-25
     * @return viod
     */
    constructor(el, vm) {
        this.el = document.querySelector(el);
        this.vm = vm;
        this.fragment = '';

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // DOM节点附加到文档片段
        this.fragment = this.nodeToFragment(this.el);

        // 编译模板
        this.isCompileElement(this.fragment);

        //重新更新DOM节点
        this.el.appendChild(this.fragment);
    }

    /**
     * DOM节点附加到文档片段
     * @author Sea
     * @param {string} el DOM元素
     * @date 2018-07-25
     * @return object
     */
    nodeToFragment(el) {
        const fragment = document.createDocumentFragment();
        let child = el.firstChild;

        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }

        return fragment;
    }

    /**
     * 判断要编译的 nodeType
     * @author Sea
     * @param {object} el 新的DOM文档对象
     * @date 2018-07-25
     * @return viod
     */
    isCompileElement(el) {
        const childNodes = el.childNodes;

        [].slice.call(childNodes).forEach((node) => {
            const reg = /\{\{(.*)\}\}/;
            const text = node.textContent;

            // 根据 nodeType 类型来编译
            if (nodeType.isElement(node)) {
                this.compileElement(node);
            } else if (nodeType.isText(node) && reg.test(text)) {
                this.compileText(node, reg.exec(text)[1]);
            }

            // 递归对元素进行深成编译
            if (node.childNodes && node.childNodes.length) {
                this.isCompileElement(node);
            }
        });
    }

    /**
     * 根据节点指令类型编译
     * @author Sea
     * @param {string} node DOM节点
     * @date 2018-07-25
     * @return viod
     */
    compileElement(node) {
        const attrs = node.attributes;

        Object.values(attrs).forEach((attr) => {
            const name = attr.name;

            if (name.indexOf('v-') >= 0) {
                const exp = attr.value;

                if (name.indexOf('on') >= 0) {
                    const eventType = name.split(':')[1];
                    this.compileEvent(node, eventType, exp);
                }
            }
        });
    }

    /**
     * 编译表达式文本
     * @author Sea
     * @param {string} node DOM节点
     * @param {string} exp 表达式
     * @date 2018-07-25
     * @return viod
     */
    compileText(node, exp) {
        const value = this.vm[exp.trim()];
        update.text(node, value);

        new Watcher(this.vm, exp, val => {
            update.text(node, val);
        });
    }
    /**
     * 编译函数
     * @author Sea
     * @param {string} node DOM节点
     * @param {string} eventType 事件类型
     * @param {string} exp 表达式
     * @date 2018-07-25
     * @return viod
     */
    compileEvent(node, eventType, exp) {
        const func = this.vm.methods[exp];

        if (eventType && exp) {
            node.addEventListener(eventType, func.bind(this.vm));
        }
    }
}