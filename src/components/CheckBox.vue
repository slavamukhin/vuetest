<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps<{ label: string; id: string; initValue: boolean }>();
const emit = defineEmits<{
  (event: "change", e: Event, name: string, value: boolean): void;
}>();

const val = ref(props.initValue ?? false);

const onChange = (e: Event) => {
  emit("change", e, props.id, val.value);
};
</script>
<template>
  <label :for="props.id">{{ props.label }}</label>
  <input :id="props.id" type="checkbox" v-model="val" @change="onChange" />
</template>
<style scoped></style>
