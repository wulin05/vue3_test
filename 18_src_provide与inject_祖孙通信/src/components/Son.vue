<template>
  <div class="son">
    <h3>我是Son组件(孙组件)</h3>
    <h4>
      通过inject获取祖组件App传递的car数据:{{ name }}: {{ car.price }}w
    </h4>
    <button @click="name += '~'">修改车名</button>
    <button @click="car.price += 1">修改价格</button>
  </div>
</template>

<script>
  import { inject, toRef } from 'vue'

  export default {
    name: 'Son',
    setup() {
      // ######## 本节内容：通过inject(注入), 获取祖组件App通过provide(提供)的方式传递的数据
      let car = inject('car')

      return { name:toRef(car, 'name'), car }
    }
  }
</script>

<style scoped>
.son {
  background-color: orange;
  padding: 10px;
}
</style>
