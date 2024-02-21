<template>
  <h2>姓名: {{ name }}</h2>
  <h2>年龄: {{ age }}</h2>
  <h2>薪水: {{ job.j1.salary }}K</h2>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
  <h4>{{ person }}</h4>
  <hr>
  <h4>当前的x是: {{ x }}</h4>
  <h4>当前的x.y值是: {{ x.y }}; </h4>
  <button @click="x.y++">点我x.y+1</button>
  <button @click="x={y:888}">点我替换x</button>
</template>

<script>
import { ref, reactive, toRefs, shallowReactive, shallowRef } from 'vue'

export default {
  name: 'Demo',

  setup() {
    // let person = shallowReactive({  // shallow是浅的意思：只考虑第一层数据的响应式 
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    // let x = ref({y:0})  
    // let x = shallowRef({y:0})：x对象里的属性(y)不是响应式的,但是x还是响应式哟~~
    // 即、x虽然RefImpl类型,但是里面的value属性是object,不是响应式的proxy。
    let x = shallowRef({
      y:0
    })  
    console.log('*******', x)  
    
    return {
      person,
      ...toRefs(person),
      x,
    }
  }
}
</script>

