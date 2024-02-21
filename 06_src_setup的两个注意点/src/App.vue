<template>
  <Demo title="插槽1" @hello="showHelloMsg" :msg="msg">
    <!-- 1.具名插槽：则需要template模板,并且是相应地填充到Demo.vue中对应的具名插槽que,ewq的slot中 -->
    <template v-slot:qwe>
      曾经沧海难为水
      除却巫山不是云
    </template>
    <template v-slot:ewq>
      <span>乱花渐欲迷人眼</span> <span>浅草才能没马蹄</span>
    </template>
  </Demo>
  <hr>

  <!-- 2.默认插槽：直接写,不需要template,并且是插入到Demo.vue的slot插槽中; -->
  <Demo title="插槽2" @hello="showHelloMsg">
    飞流直下三千尺
    疑是银河落九天
  </Demo>

</template>

<script>
  import Demo from './components/Demo'

  export default {
    name: 'App',
    components: {Demo},
    setup() {
      let msg = 'I love you!'

      function showHelloMsg(params){
        alert(`你好呀,Demo触发了自定义的hello事件,App收到的参数是: ${params}`)
      }

      return { showHelloMsg, msg }
    }
  }
</script>

