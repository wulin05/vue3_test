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

  <hr>
  <button @click="showRawPerson">输出最原始的person,是普通的object类型</button>
  <hr>

  <button @click="addMarkRawCar">给人添加一台车</button>
  <h3 v-show="person.car">汽车信息:{{ person.car }}</h3>
  <!-- person.car?.name是JavaScript 的可选链操作符（Optional Chaining）
      当person.car不存在的时候,不会继续访问person.car.name属性,避免Javascript报错~
  -->
  <h3 v-show="person.car">汽车信息:{{ person.car?.name }}</h3>
  <!-- 如果非要用v-show的话,必须保证person.car存在,不存在的话,person.car.name报错
       但是使用v-if就可以了避免这个报错,具体是因为v-if的机制....
       v-show和v-if的机制不同.....
  -->
  <h3 v-if="person.car">汽车信息:{{ person.car.name }}</h3>

  <!-- 下面是为了验证 person.car = markRaw(car) 被markRaw()包裹后,person.car不再具有响应式了  -->
  <button @click="person.car.name+='#'" v-if="person.car">换车名</button>
  <button @click="person.car.price+=1" v-if="person.car">换价格</button>
</template>

<script>
import { ref, reactive, toRefs, toRaw, markRaw } from 'vue'

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
      },
      // 第一种办法：(在addMarkRawCar函数中给person添加car的属性后)如果不这样,上面汽车信息的位置会报错
      // Property "car" was accessed during render but is not defined on instance.
      // car: {}
    })
    
    // ##### toRaw函数的功能：将一个由reactive生成的person响应式对象转为普通对象; 意味着响应式对象变成普通对象
    function showRawPerson() {
      const p = toRaw(person)    // const p = person, 由于proxy,即使是直接赋值,p也能够成为响应式数据。
      console.log('%%%%%%', p)   // 但是,由于toRaw(person),该方法是返回person的原始未代理版本,经过赋值给p,那p当然是普通对象啦。
    }

    // reactive是使用proxy机制,即使person.car=car这样直接赋值,person.car也是具有响应式的,只是Vue不处理person.car的响应
    function addMarkRawCar() {
      let car = {name:'奔驰', price:40}
      // ##### markRaw函数的功能：将响应式的数据car标记为markRaw,虽然数据本身还是具有响应式,但是Vue不会处理响应。
      // person.car = car     // person.car = car 在Vue3(proxy)与Vue(defineProperty)代理机制不同,Vue3这样赋值,person.car也是响应式的
      person.car = markRaw(car) // 即、console.log(isReactive(person.car)) 和 console.log(isProxy(person.car)) 都为true
    }

    return {
      // 第二种办法,把person都交出去,之前只是return了...toRefs(person),现在把person也return出去。
      // 为什么用person就能解决呢：因为...toRefs(person)是将person的属性都摊开了,{{car}}是直接找person.car,没有的话不是返回undefined,而是直接报错!
      // 而用person交出去的话,至少person.car有person,在没有car的情况下,person.car返回undefined, 那么模板{{person.car}}就不显示,而不会报错!
      person,

      ...toRefs(person),   // 必须在前加...,不然toRefs(person)就是对象了,再在外面包裹了{},模板无法解析,就会报错。
      sum,
      showRawPerson,
      addMarkRawCar,
    }
  }
}
</script>

