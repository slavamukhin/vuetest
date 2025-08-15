<script setup lang="ts">
import { ref, onMounted, type Ref, computed } from "vue";
import { useRoute } from "vue-router";
import { dispatchEvent } from "@/composables/useGlobalEventBus";
import { useProductStore } from "@/stores/product";
import { useBucketStore } from "@/stores/bucket";
import Button from "@/components/Button.vue";
import Counter from "@/components/Counter.vue";
import type { Product } from "@/types/product";

const route = useRoute();
const productStore = useProductStore();
const bucketStore = useBucketStore();
let product = ref<Product>({} as Product);
let countProducts = ref<number>(1);

const handleClick = (event: MouseEvent) => {
  bucketStore.AddProduct(product.value.id, countProducts.value);
  dispatchEvent("notification", {
    text: `${product.value.title} added to your Shopping bag.`,
  });
  countProducts.value = 1;
};

const handleDecrease = (e: MouseEvent, count: Ref<number>): void => {
  if (count.value <= 1) {
    console.log("Количество продукта не может быть меньше 1");
    return;
  }
  count.value--;
  countProducts = count;
};

const handleClickIncrease = (e: MouseEvent, count: Ref<number>): void => {
  if (
    count.value >=
    product.value.itemsInStock - bucketStore.getCountInBucket(product.value.id).value
  ) {
    console.log("Количество продукта не может быть больше чем доступно");
    return;
  }
  count.value++;
  countProducts = count;
};

onMounted(async () => {
  product.value = await productStore.getProduct(+route.params.id, true);
});
</script>

<template>
  <h1 class="heading1">{{ product?.title }}</h1>
  <div class="wrapper-product">
    <Counter @increase="handleClickIncrease" @decrease="handleDecrease" />
    <Button
      type="button"
      @click="handleClick"
      text="Add to card"
      theme="light"
      :data-product="product.id"
      :disabled="product.itemsInStock - bucketStore.getCountInBucket(product.id).value === 0"
    />
  </div>
</template>

<style scoped>
.wrapper-product {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}
</style>
