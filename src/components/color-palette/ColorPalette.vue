<script lang="ts" setup>
import { computed } from "vue";

import type { ColorPaletteProps } from "./types";

const props = withDefaults(defineProps<ColorPaletteProps>(), {
  modelValue: "",
  palette: undefined,
  width: "160",
});

const emit = defineEmits(["update:modelValue"]);

const containerW = computed(() => {
  return !props.width.includes("px") ? `${props.width}px` : `${props.width}`;
});

const paletteUpperCase = (palette: string[]) => {
  return palette?.map((c: string) => c.toUpperCase());
};

const onClick = (color: string) => {
  emit("update:modelValue", color);
};
</script>

<template>
  <div class="palette" :style="{ width: containerW }">
    <div
      v-for="c in paletteUpperCase(props.palette)"
      class="palette-item"
      :style="{ backgroundColor: c }"
      :key="c"
      @click="onClick(c)"
    >
      <div
        class="palette-item__picked"
        v-if="c === props.modelValue"
        :style="{
          backgroundColor: props.modelValue === '#FFFFFF' ? '#000' : '',
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.palette {
  display: flex;
  flex-wrap: wrap;
}
.palette-item {
  margin-right: 1px;
  margin-bottom: 1px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  position: relative;
}
.palette-item__picked {
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 50%;
  opacity: 1;
  background: #fff;
}
</style>
