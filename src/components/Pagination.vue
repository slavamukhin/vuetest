<script setup lang="ts">
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

const setPage = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLButtonElement;
  productStore.setPage(+target.dataset.page!);
};

const nextPage = (e: MouseEvent) => {
  productStore.setPage(productStore.pagination.page + 1);
};

const prevPage = (e: MouseEvent) => {
  productStore.setPage(productStore.pagination.page - 1);
};

const delay = 500;
</script>

<template>
  <div class="button-wrapper" v-if="productStore.pagination.total">
    <button
      class="btn"
      v-throttle:click="[prevPage, delay]"
      :disabled="productStore.pagination.page === 1"
    >
      Prev
    </button>
    <div
      v-for="n in Math.ceil(productStore.pagination.total / productStore.pagination.pageSize)"
      :key="n"
    >
      <button
        v-throttle:click="[setPage, delay]"
        :class="[productStore.pagination.page === n ? 'active' : '']"
        :data-page="n"
      >
        {{ n }}
      </button>
    </div>
    <button
      class="btn"
      v-throttle:click="[nextPage, delay]"
      :disabled="
        productStore.pagination.page ===
        Math.ceil(productStore.pagination.total / productStore.pagination.pageSize)
      "
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.button-wrapper {
  display: flex;
  gap: 11px;
  justify-content: center;
}

button {
  font-size: var(--font-size-20);
  color: var(--color-primary-black);
  background-color: var(--color-secondary-light-gray);
  width: 60px;
  height: 60px;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: var(--color-secondary-gray);
}

button[disabled],
button[disabled]:hover {
  opacity: 0.4;
  background-color: inherit;
  cursor: default;
}

.btn {
  width: 98px;
}

.active,
.active:hover {
  background-color: var(--color-primary-accent);
  color: var(--color-primary-white);
}
</style>
