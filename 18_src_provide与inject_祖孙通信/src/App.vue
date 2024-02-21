<template>
  <div class="app">
    <h3>我是App组件(祖组件), 汽车：{{ name }}--{{ price }}w</h3>
    <!-- 
      也可以通过下面的方式(本质是props)将person的数据传递给Child子组件,
      但是这个不如本节重点介绍的provide(提供)、inject(注入)方便了
      在祖组件使用provide, 在任何一个后代组件中使用inject就能够得到祖组件想要传递的数据了
    -->
    <Child :person="person"/>
    <hr>
    <h3>person信息: {{person.name}}--{{gender}}--{{hobbys}}</h3>
    <h3>
      friends信息: <br>
      {{f1.name}}--{{ f1.age }} <br>
      {{f2.name}}--{{ f2.age }} <br>
    </h3>
    <button @click="person.name += '#'">修改人名</button>
    <button @click="hobbys.splice(0,1,'滑雪')">修改爱好</button>
    <button @click="hobbys.push('睡觉')">添加爱好</button>
    <button @click="f1.age=18">修改朋友年龄</button>
    <button @click="person.height=180">添加身高属性</button>
    <hr>
    <h3 v-show="person.height">{{ person }}</h3>
  </div>
</template>

<script>
  import Child from './components/Child'
  import {reactive, toRefs, toRef, provide} from 'vue'

  export default {
    name: 'App',
    components: {Child},
    setup() {
      let car = reactive({
        name: '奔驰',
        price: 40
      })

      let person = reactive({
        name: '张三',
        gender: '男',
        hobbys: ['游泳', '唱歌', '开车'],
        friends: {
          f1:{name:'李四', age:99}, 
          f2:{name:'王五', age:88}
        }
      })

      /*#############
        本节介绍的内容：provide、inject
        父子间推荐用props; 祖孙间用provide/inject
      */
      provide('car',car)

      return { 
        // car由于层级少,使用...toRefs合适,person那边使用toRef方式,
        // 并且car和person都有name属性,所以person的name属性不使用toRef,
        // 通过return person,让插值语法也能通过person.name获取人名。
        ...toRefs(car),

        person,
        gender: toRef(person,'gender'),
        hobbys: toRef(person, 'hobbys'),
        // 下面两行表示：使用f1、f2分别关联person.friends对象的f1和f2属性
        f1: toRef(person.friends, 'f1'),   
        f2: toRef(person.friends, 'f2'),
      }
    }
  }
</script>

<style scoped>
 .app{
  background-color: gray;
  padding: 10px;
 }
</style>
