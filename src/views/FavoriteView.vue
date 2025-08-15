<script setup lang="ts">
import { watch, ref } from "vue";
import Card from "@/components/Card.vue";
import { useFavoriteStore } from "@/stores/favoriteLisr";
import { useProductStore } from "@/stores/product";
import type { Product } from "@/types/product";
import { useProductCardActions } from "@/composables/useProductCardActions";

const favoriteStore = useFavoriteStore();
const productStore = useProductStore();
let list = ref<Product[]>([]);

const { getActions } = useProductCardActions();

watch(
  () => ({ ...favoriteStore.favoriteList }),
  async (value) => {
    list.value = [];
    for (const key in value) {
      const p = await productStore.getProduct(+key);

      if (p != null) {
        list.value.push(p);
      }
    }
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <h1 class="heading1">Favorite Products</h1>
  <div class="wrapper">
    <Card
      v-for="card in list"
      :product="card"
      :key="card.id"
      v-card-action="getActions(card)"
      v-sell="card.discountPercent"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
