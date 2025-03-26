<script lang="ts">
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { collapsed  } from './state'

export default defineComponent({
    name: 'SidebarLink',
    components : {},
    props : {
        to : { type : String, required: true},
        icon : { type : String, required: true},
    },
    setup(props){
        const route = useRoute();
        const isActive = computed(() => route.path.includes(props.to));
        return { isActive, collapsed};
    },
    data(){
        return {

        }
    },
    methods: {

    },
})
</script>

<template>
    <RouterLink :to="to" class="link" :class="{ active : isActive}">
        <i class="icon p-2" :class="icon" />
        <transition name="fade">
            <span class="pl-2" v-if="!collapsed">
                <p class="font-mono text-base">
                    <slot />
                </p>
            </span>
        </transition>
    </RouterLink>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.5em 0;
    padding: 0.4em;
    border-radius: 0.25em;
    height: 1.5em;
    margin-bottom: 0.5em;

    color: white;
    text-decoration: none;
}

.link:hover {
    background-color: var(--sidebar-item-hover);
}
.link.active {
    background-color: var(--sidebar-item-active);
}
</style>