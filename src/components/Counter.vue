<script setup lang="ts">
import { defineEmits, ref, type Ref, useAttrs } from "vue";
const props = defineProps<{ initValue?: number }>();
const attrs = useAttrs();

const count = ref(props.initValue ?? 1);

const emit = defineEmits<{
  (event: "increase", e: MouseEvent, count: Ref<number>, productId?: number): void;
  (event: "decrease", e: MouseEvent, count: Ref<number>, productId?: number): void;
}>();

const handleDecrease = (e: MouseEvent): void => {
  emit("decrease", e, count, attrs["data-product"] as number | undefined);
};

const handleClickIncrease = (e: MouseEvent): void => {
  emit("increase", e, count, attrs["data-product"] as number | undefined);
};
</script>
<template>
  <div class="wrapper heading5">
    <div class="decrease" @click="handleDecrease">-</div>
    <div>{{ count }}</div>
    <div class="increase" @click="handleClickIncrease">+</div>
  </div>
</template>
<style scoped>
.wrapper {
  display: inline-flex;
  color: var(--color-secondary-dark-gray);
  background-color: var(--color-secondary-light-gray);
  border-radius: 4px;
}

div {
  display: inline-block;
}

.wrapper div {
  padding: 14px;
}

.decrease,
.increase {
  cursor: pointer;
  user-select: none;
}
</style>
