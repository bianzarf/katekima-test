<script lang="ts">
import { sidebarWidth } from "../sidebar/state";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "footer",
  components: {},
  data() {
    return {
      sidebarWidth,
    };
  },
  methods: {},
});
</script>


<template>
  <div class="footer" :style="{ left: sidebarWidth }">
    <div class="h-3 mb-2 text-base text-white cursor-pointer">
        <p>Bianza Ridha Fauqa &copy; 2025</p>
    </div>
  </div>
</template>


<style>
:root {
  --footer-bg-color: #52c28c;
}
</style>

<style scoped>
.footer {
  color: white;
  background-color: var(--footer-bg-color);

  float: right;
  position: fixed;
  justify-content: center;
  z-index: 1;
  bottom: 0;
  right: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: row;
}
</style>