<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useFavoriteStore } from "@/stores/favoriteLisr";
import type { CardProps } from "@/types/product";

const favoriteStore = useFavoriteStore();
const props = defineProps<CardProps>();
const { product, wrapperClass } = props;

const sell = `$${Math.ceil(product.price + (product.price * product.discountPercent) / 100)},00`;
</script>

<template>
  <div :class="['card-wrapper', wrapperClass]" :="$attrs">
    <div :class="['imgWrapper', favoriteStore.isFavorite(product.id) ? 'favorite' : '']">
      <img class="img" :src="product.image" alt="" srcset="" />
    </div>
    <RouterLink class="link" :to="{ name: 'product', params: { id: product.id } }">
      <div class="card-title heading3">{{ product.title }}</div>
      <div class="card-price heading4">
        <span
          class="prece-discount"
          v-if="product.discountPercent !== 0 && props.wrapperClass !== 'bucket-view'"
        >
          {{ sell }}
        </span>
        {{ `$${product.price},00` }}
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.card-wrapper {
  margin-bottom: 86px;
  margin-right: 54px;
}

.card-wrapper:nth-child(3n) {
  margin-right: 0;
}

.card-title {
  margin-bottom: 16px;
}

.card-price {
  color: var(--color-primary-accent);
}

.img {
  margin-bottom: 24px;
  display: block;
  object-fit: contain;
}

.link {
  color: var(--color-secondary-dark-gray);
}

.link:hover {
  color: var(--color-primary-black);
}

.prece-discount {
  text-decoration: line-through;
  color: var(--color-error);
}

.small-wrapper {
  margin-bottom: 70px;
  margin-right: 24px;
}

.small-wrapper .img {
  width: 300px;
  height: 300px;
}

.bucket-view {
  display: flex;
  gap: 20px;
  margin: 0;
  align-items: flex-start;
}

.bucket-view .img {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
</style>
