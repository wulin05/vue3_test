<template>
  <h1>一个人的信息</h1>
  <h2>姓名: {{ person.name }}</h2>
  <h2>年龄: {{ person.age }}</h2>
  <h3>工作种类：{{ person.job.type }}</h3>
  <h3>工作薪水：{{ person.job.salary }}</h3>
  <h3>爱好：{{ person.hobby }}</h3>
  <h3>a的值是: {{ person.job.a.b.c }}</h3>
  <button @click="changeInfo">修改人的信息</button>

</template>

<script>
import {reactive} from 'vue'

export default {
  name: 'App',
  // vue3的setup写法：所有的内容都写入到setup(){...} 函数体中
  setup() {
    // ref定义响应式数据： RefImpl: reference(引用)、implement(实现)
    // let name = ref('张三')
    // let age = ref(18)
    // let job = reactive({
    //   type:'码农',
    //   salary: '30k',
    //   a:{
    //     b:{
    //       c:666
    //     }
    //   }
    // })
    // let hobby = reactive(['抽烟', '喝酒', '烫头'])
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        type: '码农',
        salary: '30k',
        a:{
          b:{
            c:666
          }
        }
      },
      hobby: ['抽烟', '喝酒', '烫头']
    })

    // 方法
    function changeInfo(){
      person.name = '李四'
      person.age = 48
      person.job.type = '系统架构师'
      person.job.salary = '99k'
      person.job.a.b.c = 999,
      person.hobby[0] = '开车'
    }

    // 必须将定义的数据返回出去
    return {
      // name,
      // age,
      // job,
      // hobby,
      person,
      changeInfo,
    }
  }

}
</script>

<style>

</style>
