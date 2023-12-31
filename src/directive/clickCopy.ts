import { DirectiveBinding } from 'vue'
export default {
    mounted(el: any, binding: DirectiveBinding) {
        el.$value = binding.value
        // el控件定义 onclick 事件
        el.onclick = () => {
            // 动态创建 textarea 标签
            const textarea: any = document.createElement('textarea')
            // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            // 将要 copy 的值赋给 textarea 标签的 value 属性
            textarea.value = el.$value
            // 将 textarea 插入到 body 中
            document.body.appendChild(textarea)
            // 选中值并复制
            textarea.select()
            const result = document.execCommand('Copy')
            if (result) {
                console.log('复制成功')
            }
            document.body.removeChild(textarea)
        }
        // 绑定点击事件，就是所谓的一键 copy 啦
        el.addEventListener('click', el.handler)
    },
    // 当传进来的值更新的时候触发
    beforeUpdate(el: any, binding: DirectiveBinding) {
      console.log(el, binding);
      el.$value = binding.value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unmounted(el: any) {
      el.removeEventListener('click', el.handler)
    }
}
