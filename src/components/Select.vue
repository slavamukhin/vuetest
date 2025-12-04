<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
const props = defineProps<{ initValue?: string }>();
const emit = defineEmits<{
  (event: "change", e: Event, name: string, value: string): void;
}>();

const val = ref(props.initValue ?? "");

const onChange = (e: Event) => {
  emit("change", e, "sorted", val.value);
};
</script>
<template>
  <select v-model="val" @change="onChange">
    <option value="" selected>Sort by</option>
    <option value="title">Title</option>
    <option value="price">Price</option>
  </select>
</template>
<style scoped></style>
