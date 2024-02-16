<template>
  <h1>一个人的信息</h1>
  <h2>姓名: {{ name }}</h2>
  <h2>年龄: {{ age }}</h2>
  <h3>工作种类：{{ job.type }}</h3>
  <h3>工作薪水：{{ job.salary }}</h3>
  <button @click="changeInfo">修改人的信息</button>

</template>

<script>
import {ref} from 'vue'

export default {
  name: 'App',
  // vue3的setup写法：所有的内容都写入到setup(){...} 函数体中
  setup() {
    // ref定义响应式数据： RefImpl: reference(引用)、implement(实现)
    let name = ref('张三')
    let age = ref(18)
    let job = ref({
      type:'码农',
      salary: '30k'
    })

    // 方法
    function changeInfo(){
      name.value = '李四'
      age.value = 48
      job.value.type = '系统架构师'
      job.value.salary = 99
      console.log(name,age.value)
    }

    // 必须将定义的数据返回出去
    return {
      name,
      age,
      changeInfo,
      job,
    }
  }

}
</script>

<style>

</style>
