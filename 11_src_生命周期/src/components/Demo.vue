<template>
  <h2>当前求和为: {{ sum }}</h2>
  <button @click="sum++">点我+1</button>
</template>

<script>
  import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted  } from 'vue'

  export default {
    name: 'Demo',

    setup() {   
      let sum =  ref(0)

      /* 
      二、 通过组合式API的形式去使用生命周期钩子：
           这里需要注意一点,在setup中并没有提供beforeCreate和created这两个组合式(composition Api)生命周期钩子
           setup()本身,就等价于beforeCreate和created这两个生命周期钩子,简单来说,就是：
           setup()本身包含了beforeCreate、created这两个生命周期期间,直接在setup()中写逻辑就行
           综合如下：
           （配置项）             （组合式)
           beforeCreate  =====>  setup()
           created       =====>  setup()
           beforeMount   =====>  onBeforeMount
           mounted       =====>  onMounted
           beforeupdate  =====>  onBeforeUpdate
           updated       =====>  onUpdated
           beforeUnmount =====>  onBeforeUnmount
           unmounted     =====>  onUnmounted
      */
      onBeforeMount(() => {
        console.log('---onBeforeMount---')
      })
      onMounted(() => {
        console.log('---onMounted---')
      })
      onBeforeUpdate(() => {
        console.log('---onBeforeUpdate---')
      })
      onUpdated(() => {
        console.log('---onUpdated---')
      })
      onBeforeUnmount(() => {
        console.log('---onBeforeUnmount---')
      })
      onUnmounted(() => {
        console.log('---onUnmounted---')
      })

      return {
        sum,
      }
    },

    /*
    一、
    1.通过配置项的形式使用Vue3生命周期钩子,潜台词就是这些生命钩子以组合式API的形式放入到setup组合式当中
    2.setup和下面的这些生命周期钩子是平级的,都是配置项。
    3.当然可以用下面的方式使用生命周期钩子,只是Vue3的是使用beforeUnmount和unmounted替代了Vue2的beforeDestory和destory.
    */
    // beforeCreate() {
    //   console.log('---beforeCreate----')
    // },

    // created() {
    //   console.log('---created----')
    // },

    // beforeMount() {
    //   console.log('---beforeMount----')
    // },

    // mounted() {
    //   console.log('---mounted----')
    // },

    // beforeUpdate() {
    //   console.log('---beforeUpdate----')
    // },

    // updated() {
    //   console.log('---updated----')
    // },

    // beforeUnmount() {
    //   console.log('---beforeUnmount----')
    // },

    // unmounted() {
    //   console.log('---unmounted----')
    // },
    
  }
</script>

