<template>
  <div class="child">
    <h3>我是Child组件(子组件)</h3>
    <h4>输出通过组件标签上:person='person'方式传递的person数据:</h4>
    <!-- {{ name }} 是通过setup配置项中的toRef将变量name与person的name属性转换为ref的对象进行关联 -->
    <span>{{ name }}</span>
    <ul>
      <!-- 下面就通过props传递的person来遍历 -->
      <li v-for="(h, index) in person.hobbys" :key="index" >{{ h }}</li>
      <li v-for="(f, index) in person.friends" :key="index" >{{ f }}</li>
    </ul>
    <Son/>
  </div>
</template>

<script>
  import Son from './Son'
  import {toRef} from 'vue'
  export default {
    name: 'Child',
    components: {Son},
    props:['person'],  // 声明接收名为person的props

    setup(props) {     // setup(props, context) 还记得setup有两个接收参数：props和context(上下文);忘记的话,请看章节: 06_src_setup的两个注意点
      // 使用toRef将props中的person对象的name属性转换为ref对象，以便在模板中直接使用name
      const name = toRef(props.person, 'name')

      return { name }
    }
  }
</script>

<style scoped>
.child {
  background-color: skyblue;
  padding: 10px;
}
</style>