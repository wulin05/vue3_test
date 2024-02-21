<template>
  <div class="app">
    <h3>我是App组件(祖组件), 汽车：{{ name }}--{{ price }}w</h3>
  </div>
</template>

<script>
  import { reactive, toRefs, ref, readonly, toRaw, markRaw, isRef, isReactive,isReadonly,isProxy } from 'vue'

  export default {
    name: 'App',
    setup() {
      let car = reactive({
        name: '奔驰',
        price: 40
      })    
      let sum = ref(0)
      let car2 = readonly(car)
      
      console.log(isRef(sum))            // true
      console.log(isReactive(car2))      // true
      console.log(isReadonly(car2))      // true
      console.log(isProxy(car2))         // true
      
      // 测试经toRaw包裹的响应式数据car,赋值给car3,car3不是响应式对象
      let car3 = toRaw(car)
      console.log('11111',isReactive(car3))   // false
      console.log('22222',isProxy(car3))      // false

      // 测试经markRaw包裹的响应式数据car,赋值给car4,car4还是响应式对象,只是Vue不响应被标记为markRaw的car4数据
      let car4 = markRaw(car)   // 在第16章节关于toRaw和markRaw的区别点也在这里得到展现
      console.log('33333',isReactive(car4))   // true
      console.log('44444',isProxy(car4))      // true

      // 测试给car添加markRaw包裹的普通val对象的属性,当然car.val也不具备响应式啦~~~
      let val = { test1: 'aaa', test2: 'bbb' }
      car.val = markRaw(val)   // 这里关键的理解是：如果不经过markRaw(val), Vue3的Proxy会让car.val成为响应式
      console.log('55555', isReactive(car.val))  // false
      console.log('66666', isProxy(car.val))     // false

      /*
      怕乱,总结一波：
      一、
      Vue3的响应式是通过Proxy,与Vue2使用Object.defineProperty不同：
      let val = { test1: 'aaa', test2: 'bbb' }
      car.val = val
      上面的这种情况下,Vue3的car.val是有响应式的, 而Vue2的car.val是不具有响应式,得通过$set的方式才能成为响应式

      二、
      至于toRaw和markRaw的机制不同：
      toRaw是将(不管是否具有响应式)都变成普通对象后返回,所以通过toRaw赋值得到的对象,只是普通的对象
      markRaw不同,可以认为它是给响应式数据打标识,返回的数据还是响应式的,但是由于被打了markRaw标识,Vue不处理而已
      
      Raw：原始的、未经加工的
      */

      return { 
        ...toRefs(car),
        sum,
        car2,
        car3,
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
