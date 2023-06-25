import { ref, computed, onMounted } from 'vue'
// const emit = defineEmits(['updateCount']);
const countHook = emit => {
  const count = ref(0)

  const handleAdd = () => {
    count.value++
    console.log(121212, emit)
    emit('updateCount', count.value)
  }

  const doubleCount = computed(() => {
    return count.value * 2
  })

  onMounted(() => {
    handleAdd()
  })

  return {
    handleAdd,
    doubleCount,
    count,
  }
}
export { countHook }
