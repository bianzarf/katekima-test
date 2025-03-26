import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useLangStore = defineStore('language', () => {
  const selectedLang = ref('id');
  if(localStorage.getItem("selectedLang")){
    selectedLang.value = (localStorage.getItem("selectedLang") != 'null') ? localStorage.getItem("selectedLang") || '' : '';
  }
  

  watch(selectedLang, (val) => {
    localStorage.setItem("selectedLang", val)
  }, {deep : true})

  return { selectedLang }
})
