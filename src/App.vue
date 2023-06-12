<script setup lang="ts">
import ColorPalette from "./components/color-palette/ColorPalette.vue";
import { ref } from "vue";
const colors = ref("");

const palette = ref([
  "#F5EFE7",
  "#D8C4B6",
  "#4F709C",
  "#090580",
  "#46458C",
  "#E8A9A9",
  "#F4D3D3",
  "#0E2954",
  "#F2BE22",
  "#EA906C",
]);
</script>

<template>
  <div>
    <ColorPalette v-model="colors" :palette="palette" width="100" />
  </div>
</template>
