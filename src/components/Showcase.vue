<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import Pagination from "@/components/Pagination.vue";
import Card from "./Card.vue";
import type { CardProps, Product } from "@/types/product";
import { useProductCardActions } from "@/composables/useProductCardActions";

const props = defineProps<
  Pick<CardProps, "wrapperClass"> & { pagination?: boolean; promo?: boolean }
>();

const productStore = useProductStore();
const { getActions } = useProductCardActions();

const page = computed<number>(() => {
  return props.promo ? 1 : productStore.pagination.page;
});

onMounted(async () => {
  await productStore.fetchProductList();
});
</script>
<template>
  <div class="showcase-wrapper" v-if="productStore.productList[page]">
    <Card
      :wrapper-class="props.wrapperClass"
      v-for="card in props.promo
        ? productStore.lastViewProducts.reverse()
        : Object.values(productStore.productList[page] ?? [])"
      :product="card as Product"
      :key="(card as Product).id"
      v-card-action.imgWrapper="getActions(card)"
      v-sell="card.discountPercent"
    />
  </div>
  <div v-else>Загрузка...</div>
  <div v-if="props.pagination">
    <Pagination />
  </div>
</template>

<style scoped>
.showcase-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
