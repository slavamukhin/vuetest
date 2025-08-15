<script setup lang="ts">
import { watch, ref, computed, type Ref } from "vue";
import { useBucketStore } from "@/stores/bucket";
import { useProductStore } from "@/stores/product";
import type { Product } from "@/types/product";
import Card from "@/components/Card.vue";
import Counter from "@/components/Counter.vue";
const bucketStore = useBucketStore();
const productStore = useProductStore();
const list = ref<Product[]>([]);

const total = computed(() =>
  list.value.reduce((acc, product) => {
    return acc + bucketStore.getCountInBucket(product.id).value * product.price;
  }, 0),
);

watch(
  () => bucketStore.bucket,
  async (value) => {
    list.value = [];
    for (const key of value.keys()) {
      const p = await productStore.getProduct(+key);

      if (p != null) {
        list.value.push(p);
      }
    }
  },
  { deep: true, immediate: true },
);

const handelIncrease = (e: MouseEvent, count: Ref<number>, productId?: number) => {
  if (count.value - list.value.find((product) => product.id === productId)!.itemsInStock >= 0) {
    console.log("Количество продукта не может быть больше чем доступно");
    return;
  }

  bucketStore.AddProduct(productId!, 1);
  count.value++;
};

const handleDecrease = (e: MouseEvent, count: Ref<number>, productId?: number) => {
  if (count.value <= 1) {
    console.log("Количество продукта не может быть меньше 1");
    return;
  }

  bucketStore.AddProduct(productId!, -1);
  count.value--;
};
</script>

<template>
  <h1 class="heading1">Bucket</h1>
  <div
    class="bucket-wrapper"
    v-for="card in list"
    v-cross="() => bucketStore.removeProduct(card.id)"
    :key="card.id"
  >
    <Card :wrapper-class="'bucket-view'" :product="card" />
    <div class="count">
      <Counter
        :initValue="bucketStore.getCountInBucket(card.id).value"
        @increase="handelIncrease"
        @decrease="handleDecrease"
        :data-product="card.id"
      />
    </div>
  </div>
  <div class="price heading4">Total: ${{ total }},00</div>
</template>

<style scoped>
.bucket-wrapper {
  display: flex;
  align-items: flex-start;
  margin: 0;
  gap: 20px;
  border-bottom: 1px solid var(--color-secondary-gray);
  margin-bottom: 20px;
  justify-content: space-between;
}

.count {
  margin-right: 66px;
}

.price {
  color: var(--color-primary-accent);
}
</style>
