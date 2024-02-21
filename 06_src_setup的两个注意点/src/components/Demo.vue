<template>
  <h2>{{ title }}</h2>
  <button @click="test">触发Demo组件的自定义hello事件</button>
  <br>

  <!-- 具名插槽 -->
  <slot name="qwe"></slot>
  <br>
  <slot name="ewq"></slot>
  
  <!-- 默认插槽 -->
  <slot></slot>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Demo',
  props: ['title', 'msg'],
  emits:['hello'],            // Vue3必须在这边使用emits声明接收App给它绑定的hello事件,Vue2不需要这么做..
  setup(props, context) {     // setup只能收到2个参数: props, context
    // console.log('---setup---', this)     // this是undefined
    console.log('#######---setup---', props)    // Proxy(Object) {title: '插槽1', msg: 'I love you!'} 和 Proxy(Object) {title: '插槽2', msg: undefined}
    // console.log('---setup---', context)     // context有三个属性是需要关心的：attrs, emit, slots
    
    let person = reactive({
      name: '张三',
      age: 18,
    })

    function test() {
      // 通过上下文context,调用emit方法触发自定义事件hello; 注意和Vue2的触发自定义事件的不同: this.$emit(....)
      context.emit('hello', 666)
    }

    return {
      person,
      test,
    }
  }

}
</script>

