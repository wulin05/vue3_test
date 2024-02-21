<template>
  <button @click="isShowDemo = !isShowDemo">切换隐藏/显示</button>
  <Demo v-if="isShowDemo"/>
</template>

<script>
  import Demo from './components/Demo'
  import {ref} from 'vue'

  export default {
    name: 'App',
    components: {Demo},
    setup() {
      let isShowDemo = ref(true)

      return {
        isShowDemo,
      }
    }
  }
</script>

