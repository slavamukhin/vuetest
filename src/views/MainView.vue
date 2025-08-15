<script setup lang="ts">
import { RouterLink } from "vue-router";
import Slider from "@/components/Slider.vue";
import Showcase from "@/components/Showcase.vue";
import { usePromo } from "@/composables/usePromo";
import { useProductStore } from "@/stores/product";
import { onMounted } from "vue";

const { promo } = usePromo();
</script>

<template>
  <Slider v-promo="promo" />
  <div class="title-wrapper">
    <div class="title heading1">Shop The Latest</div>
    <RouterLink class="link heading4" :to="{ name: 'shop' }">View All</RouterLink>
  </div>
  <Showcase :promo="true" />
</template>

<style scoped>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 39px;
}

.link {
  color: var(--color-primary-accent);
}

.link:hover,
.link:active {
  color: var(--color-primary-black);
}
</style>
