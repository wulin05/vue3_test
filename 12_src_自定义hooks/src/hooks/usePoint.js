import { reactive, onMounted, onBeforeUnmount } from 'vue'

// function savePoint() {
export default function () {

  // 实现鼠标点击获取坐标的功能

  let point = reactive({
    x: 0,
    y: 0
  })

  /*
  // 1. 使用组合式在挂载完成后获取鼠标点击屏幕得到坐标
  onMounted(() => {
    // 但是这有点不好：在window上添加事件监听,当Demo组件没有了,App组件照样还在监听
    // 表现出来是：Demo组件不挂载了,App页面点击,在控制台照样有坐标输出,所以就有了2的移除监听...
    window.addEventListener('click',(event) => {
      // console.log('#####',event.pageX, event.pageY)
      point.x = event.pageX
      point.y = event.pageY
    })
  })

  // 2.移除监听,由于window.removeEventListener('click', )
  onBeforeUnmounted(() => {
    window.removeEventListener('click', ???)
  })
  */

  // 点击事件处理函数
  function savePoint(event) {
    // 处理点击事件的逻辑
    point.x = event.pageX
    point.y = event.pageY
  }
  // 在组件挂载时添加事件监听器
  onMounted(() => {
    // 添加点击事件监听器: 点击'click', 点击事件处理函数'savePoint'
    window.addEventListener('click', savePoint)
  })

  // 在组件即将卸载时移除事件监听器
  onBeforeUnmount(() => {
    // 移除点击事件监听器
    window.removeEventListener('click', savePoint)
  })

  return point
  // 千万别 return { point }
  // 这是js代码中return返回值,不是Vue的export default中的setup(){ return {point}}啊
}

// export default savePoint