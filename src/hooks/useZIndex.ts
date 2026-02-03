import {ref, computed} from 'vue'

const zIndex = ref(0)
const useZIndex = (initValue = 2000) => {
  const initialZIndex = ref(initValue)
  const currentZIndex = computed(()=>initialZIndex.value + zIndex.value)
  const nextZIndex = ()=>{
    zIndex.value++
    return currentZIndex.value
  }
  return {
    currentZIndex,
    nextZIndex,
    initialZIndex,
  }
}
export default useZIndex
