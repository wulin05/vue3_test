<template>
  <h4>当前求和为: {{ sum }}</h4>
  <button @click="sum++">点我sum++</button>
  <hr>
  <h2>姓名: {{ name }}</h2>
  <h2>年龄: {{ age }}</h2>
  <h2>薪水: {{ job.j1.salary }}K</h2>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, reactive, toRefs, readonly, shallowReadonly } from 'vue'

export default {
  name: 'Demo',

  setup() {
    let sum = ref(0)
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    /*
    readonly、shallowReadonly解析：
    1.readonly：让一个响应式数据变为只读的(深只读)
    2.shallowReadonly: 让一个响应式数据变为只读的(浅只读)
    3.应用场景：不希望数据被修改时
      A.响应式数据会禁止被修改;而如果不是用ref或reactive定义的数据,即、非响应式的数据,是可以被修改的。
      B.如果这个数据是从别的组件传过来的,禁止在本组件去修改,那么用他们就很合适。
    */
    // person = readonly(person)
    person = shallowReadonly(person)
    sum = readonly(sum)
    // sum = shallowReadonly(sum)  // 没有必要用shallowReadonly,因为sum本来就没有层次
    
    return {
      ...toRefs(person),
      sum
    }
  }
}
</script>

