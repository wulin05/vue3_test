<template>
  <h2>当前求和为: {{ sum }}</h2>
  <button @click="sum++">点我+1</button>
  <hr>

  <h2>当前的信息为：{{ msg }}</h2>
  <button @click="msg += '~'">修改msg信息</button>
  <hr>

  <h2>姓名: {{ person.name }}</h2>
  <h2>年龄: {{ person.age }}</h2>
  <h2>薪水: {{ person.job.j1.salary }}K</h2>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, watch, reactive } from 'vue'

export default {
  name: 'Demo',

  // watch: {
  //   // // Vue2的watch简写写法：
  //   // sum(newvalue, oldvalue){
  //   //   console.log('sum的值变化了', newvalue, oldvalue)
  //   // }

  //   // Vue2的watch的完整版写法: 好处是可以配置一些属性
  //   sum:{
  //     immediate:true,
  //     deep:true,
  //     handler(newvalue, oldvalue){
  //       console.log('sum的值变化了', newvalue, oldvalue)
  //     }
  //   }
  // },

  setup() {
    let sum = ref(0)
    let msg = ref('为了情况二所设置的msg')
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    // 两个watch可以同时存在,当sum值变化的时候,控制台会有两个watch输出;msg只有第二个watch监测的到。
    // 情况一：监视ref所定义的一个响应式数据
    // watch(sum, (newValue, oldValue) => {
    //   console.log('sum的值变化了', newValue, oldValue)
    // }, {immediate:true, deep:true})

    // 情况二：监视ref所定义的多个响应式数据;
    // watch([sum, msg], (newValue, oldValue) => {
    //    console.log('sum的值变化了', newValue, oldValue)
    // })

    /*
      情况三：监视reactive所定义的一个响应式数据的全部属性 
              1.注意：此处无法正确的获取oldValue
              2.注意：强制开启了深度监视(deep配置无效)
              
              这里补充知识点：如果person是用ref定义的响应式数据：let person = ref({...})    
              要注意前提,不是用reactive定义的,是用ref定义的person......
              那么如果要监视person的全部属性：
              方式一：通过查看person.value,可以得知person.value是由proxy包裹的,
                      也就说明person.value是由reactive定义的,所以默认是开启深度监视,
                      方式一总结看：ref监视的话,用person.value; reactive,用person
              watch(person.value, (newValue,oldValue)=>{
                console.log('person的值变化了', newValue, oldValue)
              })

              方式二：
              watch(person, (newValue,oldValue)=>{
                console.log('person的值变化了', newValue, oldValue)
              }, (deep:true)) 
            
    */
    // watch(person, (newValue,oldValue)=>{
    //    console.log('person的值变化了', newValue, oldValue)
    // }, (deep:false))   // 此处的deep配置无效

    /*
    情况四：监视reactive所定义的一个响应式数据中的某个属性
    下面这个写法,监视person.age是不可以滴,因为person.age就是18,监视18毫无意义,所以要用函数
    watch(person.age, (newValue, oldValue) => {
      console.log('person的age值变化了', newValue, oldValue)
    })
    */
    // watch(() => person.age, (newValue, oldValue) => {
    //    console.log('person的age值变化了', newValue, oldValue)
    // })

    /*
    情况五：监视reactive所定义的一个响应式数据中的某些属性
    */
    // watch([() => person.name, () => person.age], (newValue, oldValue) => {
    //   console.log('person的name或age值变化了', newValue, oldValue)
    // })

    /*
    特殊情况: 如果只是监视reactive定义的响应式数据中的某个属性,并且这个属性依然是对象类型,那么要开启深度监视
            1.注意：和情况三一样，无法正确的获取oldValue
            2.注意：和情况三不一样，必须手动开启深度监视。            
    */
    // 
    watch(() => person.job, (newValue, oldValue) => {
      console.log('person的job值变化了', newValue, oldValue)
    }, { deep: true })     // 此处必须开启深度监视deep..

    return {
      sum,
      watch,
      msg,
      person,
    }
  }

}
</script>

