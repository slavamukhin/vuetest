<script setup lang="ts">
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import CheckBox from "@/components/CheckBox.vue";
import { useProductStore } from "@/stores/product";

const storeProduct = useProductStore();
const handleChange = (e: Event, name: string, value: string | boolean): void => {
  storeProduct.setQueryParams({ [name]: value });
};
</script>
<template>
  <Input @change="handleChange" :initValue="storeProduct.queryParams.search" />
  <Select @change="handleChange" :initValue="storeProduct.queryParams.sorted" />
  <CheckBox
    @change="handleChange"
    label="On sell"
    id="onSell"
    :initValue="storeProduct.queryParams.onSell"
  />
  <CheckBox
    @change="handleChange"
    label="In stock"
    id="inStock"
    :initValue="storeProduct.queryParams.inStock"
  />
</template>
<style scoped></style>
