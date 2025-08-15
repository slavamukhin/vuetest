<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
const props = defineProps<{ initValue?: string }>();

const emit = defineEmits<{
  (event: "change", e: Event, name: string, value: string | boolean): void;
}>();

const text = ref(props.initValue ?? "");

const debouncedInput = (e: Event) => {
  emit("change", e, "search", text.value);
};
</script>

<template>
  <input type="text" v-model="text" v-debounce:input="[debouncedInput, 800]" />
</template>

<style scoped></style>
