<template>
  <h1>一个人的信息</h1>
  姓：<input type="text" v-model="person.firstName">
  <br>
  名：<input type="text" v-model="person.lastName">
  <br>
  <span>全名：{{ person.fullName }}</span>

  <hr>
  <!-- 如果想让全面fullName也能被修改,并且具有响应式的话 -->
  全名：<input type="text" v-model="person.fullName">
</template>

<script>
  import { reactive, computed } from 'vue'

  export default {
    name: 'Demo',
    // 这是Vue2的计算属性的写法,但是明显不要这么写,有setup组合式,又用Vue2的配置项,这就很乱了....
    // computed:{
    //   fullName(){
    //     return this.person.firstName + '-' + this.person.lastName
    //   }
    // },

    setup() {   
      let person =  reactive({
        firstName: '张',
        lastName : '三',
      })
      // 计算属性,下面的写法不合适,fullName也应该是person的一个属性,所以不应该单独把fullName给拧出来,所以下面注释掉了
      // let fullName = computed(() => {
      //   return person.firstName + '-' + person.lastName
      // })

      // 计算属性--简写(没有考虑计算属性被修改的情况)
      // person.fullName = computed(() => {
      //   return person.firstName + '-' + person.lastName
      // })

      // 计算属性--完整写法(考虑计算属性可读可写的情况)
      person.fullName = computed({
        get(){
          return person.firstName + '-' + person.lastName
        },
        set(value){
          const nameArr = value.split('-')
          person.firstName = nameArr[0]
          person.lastName = nameArr[1]
        }
      })

      

      return {
        person,
        // fullName
      }
    }

  }
</script>

