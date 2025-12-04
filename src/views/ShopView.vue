<script setup lang="ts">
import Showcase from "@/components/Showcase.vue";
import Filters from "@/components/Filters.vue";
</script>

<template>
  <h1 class="heading1 title">Shop The Latest</h1>
  <div class="wrapper">
    <div class="filters-wrapper">
      <Filters />
    </div>
    <div class="showcase-wrapper">
      <Showcase :wrapper-class="'small-wrapper'" :pagination="true" :promo="false" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.title {
  margin-top: 96px;
  margin-bottom: 39px;
}

.filters-wrapper {
  width: 20%;
}

.showcase-wrapper {
  width: 76%;
}
</style>
