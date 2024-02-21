<template>
  <input type="text" v-model="keyWord">
  <h3>{{ keyWord }}</h3>
</template>

<script>
  // 本节重点 (Vue的API)customRef 作用是：创建一个自定义的ref,并对其依赖项跟踪和更新触发进行显示控制
  import {ref, customRef} from 'vue'

  export default {
    name: 'App',
    setup() {
      // 自定义一个ref(本质是一个函数),名为：myRef; value是初始值,delay是设置定时器的延迟时间
      function myRef(value, delay) {
        return customRef((track,trigger) => {
          let timer
          return {
            // get:function(){},
            // set:function(){},
            get(){  
              // 通过customRef函数的传入参数track(追踪)形参value的改变: get中如果没有使用track(),
              // 那get只会在初始化的时候读取value值,后续set对value值的改变,get都不会理睬。
              track()
              // 当从myRef读取了数据,get被调用了,那么就把myRef('hello')的实参hello赋给形参value,并返回出去
              return value
            },
            set(newValue){  
              clearTimeout(timer)  // 防抖：通过清除定时器,避免用户输入非常快导致的定时器累积,输入框出现抖动
              // 这只是为了实现用户输入新值后,过600ms执行定时器;
              // 这里有个小bug：如果用户输入非常快,那就会出现累积很多次的定时器,所以通过timer,先执行clearTimeout,清除每一次输入产生的定时器
              // 这样的结果就是：用户输入间隔在600ms以上,输入框才会显示用户输入的新值
              timer = setTimeout(() => {
                // 把得到的用户输入的新值newValue赋值给形参value,set就被调用了
                value = newValue
                // 然后通过customRef函数的传入参数trigger(触发),通知(触发)Vue去重新解析模板
                trigger()
              }, delay);
            }
          }
        })
      }
      // let keyWord = ref('hello')  // 使用Vue提供的内置ref
      let keyWord = myRef('hello', 600)   // 使用程序员自定义的myRef, 600这个形参可要可不要,不要的话,就在setTimeout那边直接设置就好。

      return {
        keyWord,
      }
    }
  }
</script>

