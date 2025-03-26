<script lang="ts">
import { sidebarWidth } from "../sidebar/state";
import { defineComponent, ref } from "vue";
import Avatar from "primevue/avatar";
import { useLangStore } from '../../stores/lang'

export default defineComponent({
  id: "header",
  name: "header",
  components: { Avatar },
  setup() {
    const storeLang = useLangStore()
    const menu = ref();
    const items = ref([
      {
        items: [
          {
            label: "Logout",
            icon: "pi pi-refresh",
          },
          {
            label: "Export",
            icon: "pi pi-upload",
          },
        ],
      },
    ]);

    return { storeLang, menu, items };
  },
  data() {
    return {
      sidebarWidth,
    };
  },
  methods: {
    onChangeLang(){
      this.storeLang.selectedLang =  this.$i18n.locale
    }
  },
});
</script>


<template>
  <div class="header" :style="{ left: sidebarWidth }">
    <div class="h-10 pl-2 text-2xl font-bold text-white cursor-pointer"></div>
    <button class="group absolute top-0 right-0 cursor-pointer cursor-pointer">
      <div>
        <div class="flex justify-center p-3 mr-1">
          <Avatar class="pi pi-user" style="width: 25px" shape="circle" />
          <span class="ml-4 mt-1 font-mono font-bold text-base text-white">
            Username
          </span>
        </div>
      </div>

      <div
        class="absolute bg-white text-black top-full mt-[6px] right-[20px] rounded-lg mt-1 p-3 shadow-md scale-y-0 group-focus:scale-y-100 duration-200"
      >
        <div class="cursor-pointer hover:bg-gray-300 p-4">Profile</div>
        <div class="cursor-pointer hover:bg-gray-300 p-4">Logout</div>
      </div>
    </button>

    <div class="absolute pt-1 pr-2 right-35 top-0 cursor-pointer">
      <span class="cursor-pointer font-mono font-bold text-base text-white">
        <form class="max-w-sm mx-auto">
          <select
            v-model="$i18n.locale"
            @change="onChangeLang"
            class="bg-green-600 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="id">&#127470;&#127465; Indonesia</option>
            <option value="en">&#127482;&#127480; English (US)</option>
            <option value="jp">&#127471;&#127477; Japan</option>
            <option value="fr">&#127467;&#127479; France</option>
            <option value="de">&#127465;&#127466; Germany</option>
          </select>
        </form>
      </span>
    </div>
  </div>
</template>


<style>
:root {
  --header-bg-color: #52c28c;
}
</style>

<style scoped>
.header {
  color: white;
  background-color: var(--header-bg-color);

  float: right;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: row;
}
</style>