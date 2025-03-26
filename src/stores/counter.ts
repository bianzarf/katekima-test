import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  if(localStorage.getItem("count")){
    count.value = parseInt(localStorage.getItem("count") || '0');
  }

  watch(count, (val) => {
    localStorage.setItem("count", val.toString())
  }, {deep : true})

  function increment() {
    count.value++
  }
  function decrement() {
    count.value++
  }

  return { count, doubleCount, increment, decrement }
})
