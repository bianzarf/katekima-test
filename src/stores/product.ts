import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const selected = ref("");
  const filterTitle = ref("");
  const page = ref(1);
  
  if(localStorage.getItem("filterTitle")){
    filterTitle.value = (localStorage.getItem("filterTitle") != 'null') ? localStorage.getItem("filterTitle") || '' : '';
  }

  if(localStorage.getItem("selected")){
    selected.value = (localStorage.getItem("selected") != 'null') ? localStorage.getItem("selected") || '' : '';
  }

  if(localStorage.getItem("page")){
    page.value = parseInt(localStorage.getItem("page") || '1');
  }

  watch(filterTitle, (val) => {
    localStorage.setItem("filterTitle", val)
  }, {deep : true})
  watch(selected, (val) => {
    localStorage.setItem("selected", val)
  }, {deep : true})
  watch(page, (val) => {
    localStorage.setItem("page", val.toString())
  }, {deep : true})

  return { filterTitle, selected, page }
})
