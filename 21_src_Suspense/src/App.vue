<template>
  <div class="app">
    <h3>我是App组件</h3>
    <!-- ######## 从Suspense包裹的部分都是固定写死的,不要改 -->
    <Suspense>
      <template v-slot:default>
        <Child/>
      </template>
      <template v-slot:fallback>
          <h3>稍等、加载中</h3>
      </template>
    </Suspense>
  </div>
</template>

<script>
  // import Child from './components/Child'   // 静态引入

  import {defineAsyncComponent} from 'vue'    // 导入API: defineAsyncComponent
  // const Child = defineAsyncComponent(() => {
  //   return import('./components/Child')
  // })
  // 上面简写为：
  const Child = defineAsyncComponent(() => import('./components/Child')) // 异步(动态)引入

  export default {
    name: 'App',
    components: {Child},
  }
</script>

<style scoped>
 .app{
  background-color: gray;
  padding: 10px;
 }
</style>
