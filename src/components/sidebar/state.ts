import {ref, computed } from 'vue'

const collapsed = ref(false)
const toggleSidebar = () => (collapsed.value = !collapsed.value)

const SIDEBAR_WIDTH = 180
const SIDEBAR_WIDTH_COLLAPSED = 64
const sidebarWidth = computed(
    ()=> `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)

export { collapsed, toggleSidebar, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED, sidebarWidth }