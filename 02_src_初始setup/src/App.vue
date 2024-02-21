<template>
  <h1>一个人的信息</h1>
  <h2>姓名: {{ name }}</h2>
  <h2>年龄: {{ age }}</h2>
  <h2>性别: {{ gender }}</h2>
  <h2>a的值是: {{ a }}</h2>
  <button @click="sayHello">说话(Vue3所配置的--sayHello)</button>
  <br>
  <br>
  <button @click="sayWelcome">说话(Vue2所配置的--sayWelcome)</button>
  <br>
  <br>
  <button @click="vue2_test">测试一下在Vue2的配置中去读取Vue3的数据、方法</button>
  <br>
  <br>
  <button @click="vue3_test">测试一下在Vue3的setup配置中去读取Vue2的数据、方法</button>

</template>

<script>
// import {h} from 'vue'

export default {
  name: 'App',
  // vue2的写法：直接写到{}里,所以都是key-value键值对的写法。data是因为简写方式,原型是 data: function(){...}
  data() {
    return {
      gender: '男',
      a: 100
    }
  },
  methods: {
    sayWelcome(){
      alert('欢迎来到凤山学前端~')
    },

    vue2_test(){
      console.log(this.gender)
      console.log(this.a)
      // 下面三个是在vue3的setup中定义的
      console.log(this.name)
      console.log(this.age)
      this.sayHello()
    }
  },


  // vue3的setup写法：所有的内容都写入到setup(){...} 函数体中
  setup() {
    // 数据
    let name = '张三'
    let age = 18

    // 方法
    function sayHello() {
      alert(`我叫${name}, 今年${age}岁了。正在苦学前端Vue~`)
    }

    function vue3_test() {
      // 自己这边的name、age、sayHello就不用this了,因为是在函数体里的~~~
      console.log(name)
      console.log(age)
      sayHello()

      //gender和a是在vue2中定义的
      console.log(this.gender)
      console.log(this.a)
      this.sayWelcome()
    }

    // 必须将定义的数据返回出去
    return {
      name,
      age,
      sayHello,
      vue3_test,
    }

    // return ()=>{ return h('h1', '凤山大学')}
  }

}
</script>