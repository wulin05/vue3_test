<template>
  <!-- <h2>姓名: {{ person.name }}</h2>
  <h2>年龄: {{ person.age }}</h2>
  <h2>薪水: {{ person.job.j1.salary }}K</h2>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button> -->
  <h2>姓名: {{ name }}</h2>
  <h2>年龄: {{ age }}</h2>
  <h2>薪水: {{ salary }}K</h2>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="salary++">涨薪</button>
  <h4>{{ person }}</h4>
</template>

<script>
import { ref, reactive, toRef, toRefs } from 'vue'

export default {
  name: 'Demo',

  setup() {
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    
    console.log('******', person)

    const name1 = toRef(person, 'name')
    console.log('@@@@@@@', name1)

    const x = toRefs(person)
    console.log('#######', x)

    return {
      person,  // 如果不使用下面的方式,直接用 person 的话,插值语法就麻烦一点：person.name、person.age...,但是就不用考虑使用toRef和toRefs了。。
   
      // name: person.name,   // 原想法是这样写后,在插值那边,可以简写,不用再person.name,直接用name
      // age: person.age,     // 但,其实这样是不行的, 这是赋值操作： name: '张三', age: 18, salary: 20; 这样的话,name,age,salary跟person里的name,age,salary一点关系都没有
      // salary: person.job.j1.salary   //这里的name,age,salary是自己定义的,压根就不是person里对应的name、age、salary
        
      // 由于不能使用上面的方式来实现,延伸出toRef的方法：toRef、toRefs其实是生成了新的ref对象,对象中的value属性引用了原数据(person)的属性(其实就是做了关联,保持与原数据person双向同步)
      name: toRef(person, 'name'),   // 下面的内容, 重点!重点!重点!
      age: toRef(person, 'age'),     // name: ref(person.name),这样虽然好像界面是响应式的,但是这只是将person.name的值使用ref包裹后赋值给name
      // salary: toRef(person.job.j1, 'salary')  // name和person.name其实是没有关系的,即、修改了name,原数据person.name不变。
      salary: ref(person.job.j1.salary),  // 故意这么写,通过页面显示的效果：薪水变化了,但是下面显示person里的salary不变。
      
      // 或者可以使用下面的方式: toRefs(person)生成了一个ref对象,并且使用..."摊开"person的属性, 但是只能摊开第一层,要使用salary,虽然不需要person了,还是得这样：{{job.j1.salary}}
      ...toRefs(person)

      /*
      Vue官网关于toRef的说明：
      可以基于响应式对象上的一个属性，创建一个对应的 ref。
      这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。
      
      Vue官网关于toRefs的说明：
      将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。
      每个单独的 ref 都是使用 toRef() 创建的。
      
      */
    }
  }

}
</script>

