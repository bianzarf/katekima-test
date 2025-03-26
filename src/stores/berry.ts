import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useBerryStore = defineStore('berry', () => {
  const selected = ref("");
  const filterName = ref("");
  const page = ref(1);
  
  if(localStorage.getItem("filterName")){
    filterName.value = (localStorage.getItem("filterName") != 'null') ? localStorage.getItem("filterName") || '' : '';
  }

  if(localStorage.getItem("selected")){
    selected.value = (localStorage.getItem("selected") != 'null') ? localStorage.getItem("selected") || '' : '';
  }

  if(localStorage.getItem("page")){
    page.value = parseInt(localStorage.getItem("page") || '1');
  }

  watch(filterName, (val) => {
    localStorage.setItem("filterName", val)
  }, {deep : true})
  watch(selected, (val) => {
    localStorage.setItem("selected", val)
  }, {deep : true})
  watch(page, (val) => {
    localStorage.setItem("page", val.toString())
  }, {deep : true})

  return { filterName, selected, page }
})
