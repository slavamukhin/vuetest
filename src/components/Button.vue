<script setup lang="ts">
import { defineProps, defineEmits, useAttrs } from "vue";
interface ButtonPropps {
  text: string;
  theme: "dark" | "light";
}

const props = defineProps<ButtonPropps>();
const attrs = useAttrs();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const onClick = (event: MouseEvent): void => {
  emit("click", event);
};

const delay = 500;
</script>

<template>
  <button :="attrs" v-throttle.click="[onClick, delay]" :class="['button', props.theme]">
    {{ props.text.toUpperCase() }}
  </button>
</template>

<style scoped>
.button {
  padding: 16px;
  width: 228px;
  border: 1px solid var(--color-primary-black);
  border-radius: 4px;
  font-weight: 500;
  font-size: var(--font-size-12);
  cursor: pointer;
}

.dark {
  color: var(--color-primary-white);
  background-color: var(--color-primary-black);
}

.dark:hover,
.dark:active {
  color: var(--color-primary-black);
  background-color: var(--color-primary-white);
}

.dalightrk {
  color: var(--color-primary-black);
  background-color: var(--color-primary-white);
}

.light:hover,
.light:active {
  color: var(--color-primary-white);
  background-color: var(--color-primary-black);
}

.button[disabled] {
  background-color: initial;
  color: initial;
}
</style>
