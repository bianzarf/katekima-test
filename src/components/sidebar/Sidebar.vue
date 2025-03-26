<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue'

export default defineComponent({
    name: 'Sidebar',
    components : { SidebarLink },
    data(){
        return {
            collapsed,
            sidebarWidth
        }
    },
    methods: {
        toggleSidebarChange(){
            toggleSidebar();
        }
    },
})
</script>


<template>
    <div class="sidebar" :style="{ width : sidebarWidth }">
        <h1 class="p-2 border-b-2 mb-4">
            <span class="font-mono text-2xl font-extrabold" v-if="collapsed">
                <div class="pl-2">K</div>
            </span>
            <span v-else class="font-mono text-xl font-bold">KATEKIMA</span>
        </h1>

        <SidebarLink to="/berry/full-data" icon="pi pi-chart-pie">{{$t('sidebar.berry_1')}}</SidebarLink>
        <SidebarLink to="/berry/server-side" icon="pi pi-chart-pie">{{$t('sidebar.berry_2')}}</SidebarLink>
        <SidebarLink to="/product" icon="pi pi-shopping-cart">{{$t('sidebar.product')}}</SidebarLink>

        <span
            class="collapse-icon"
            :class="{ 'rotate-180' : collapsed }"
            @click="toggleSidebarChange"
        >
            <i class="fas fa-angle-double-left" />
        </span>
    </div>
</template>


<style>
:root {
    --sidebar-bg-color: #2f855a;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
}
</style>

<style scoped>
    .sidebar {
        color: white;
        background-color: var(--sidebar-bg-color);

        float: left;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 0;
        padding: 0.5em;

        transition: 0.3s ease;

        display: flex;
        flex-direction: column;
    }

    .collapse-icon {
        position: absolute;
        bottom: 0;
        padding: 0.75em;

        color: rgba(255, 255, 255, 0.7);

        transition: 0.2s linear;
    }

    .rotate-180 {
        transform: rotate(0deg);
        transition: 0.2s linear;
    }
</style>