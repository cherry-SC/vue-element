import { defineComponent } from 'vue'

const REnderVnode = defineComponent({
  props:{
    vNode:{
      type:[String,Object],
      required:true
    }
  },
  setup(props){
    return ()=>  props.vNode
  }
})

export default REnderVnode
