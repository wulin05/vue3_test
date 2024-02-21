<template>
  <h2>当前求和为: {{ sum }}</h2>
  <button @click="sum++">点我+1</button>
  <hr>

  <h2>当前的信息为：{{ msg }}</h2>
  <button @click="msg += '~'">修改msg信息</button>
  <hr>

  <h2>姓名: {{ person.name }}</h2>
  <h2>年龄: {{ person.age }}</h2>
  <h2>薪水: {{ person.job.j1.salary }}K</h2>
  <button @click="person.name+='~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
  import { ref, watch, reactive, watchEffect } from 'vue'

  export default {
    name: 'Demo',

    setup() {   
      let sum =  ref(0)
      let msg = ref('为了情况二所设置的msg')
      let person = reactive({
        name: '张三',
        age: 18,
        job:{
          j1:{
            salary: 20
          }
        }
      })

      // 监视ref所定义的一个响应式数据
      // watch(sum, (newValue, oldValue) => {
      //   console.log('sum的值变化了', newValue, oldValue)
      // }, {immediate:true, deep:true})
      
      // watchEffect监视
      watchEffect(() => {
        console.log('watchEffect所指定的回调执行了')
        const x1 = sum.value
        const x2 = person.job.j1.salary
        // 写具体的逻辑：watchEffect能监测的到,只要出现,就能被监测,不需要指明监视哪一个数据。
      })

      return {
        sum,
        watch,
        msg,
        person,
      }
    }

  }
</script>

