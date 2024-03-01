<template>
  <h2>当前求和为: {{ sum }}</h2>
  <button @click="sum++">点我+1</button>

  <h2>当前点击时,鼠标的坐标为: x:{{ point.x }}, y:{{point.y}}</h2>
</template>

<script>
  // import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
  import { ref } from 'vue'

  // usePoint.js文件中savePoint函数的函数体其实原先是写在下面的setup()里面的,后面被剪切,作为某个特定功能函数写在usePoint.js文件中
  // 将写在Demo.vue里的hooks目录的usePoint.js文件中的功能函数导入进来(该文件中函数是savePoint),重命名为usePoint
  import usePoint from '../hooks/usePoint'

  export default {
    name: 'Demo',

    setup() {   
      let sum =  ref(0)

      // 得到hooks目录usePoint.js中savePoint函数的返回值
      let point = usePoint()

      return {
        sum,
        point,
      }
    }
    
  }
</script>

