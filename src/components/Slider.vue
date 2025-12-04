<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { usePromoStore } from "@/stores/promo";
import type { Swiper as SwiperInstance } from "swiper/types";

const promoStore = usePromoStore();

const onChange = (swiper: SwiperInstance): void => {
  promoStore.setActiveIndex(swiper.realIndex);
};
</script>

<template>
  <div class="sliderWrapper">
    <Swiper
      :slides-per-view="1"
      :space-between="0"
      :autoplay="{ delay: 5000 }"
      :pagination="{ clickable: true }"
      :lazy="true"
      :modules="[Pagination, Autoplay]"
      @slide-change="onChange"
    >
      <SwiperSlide v-for="slide in promoStore.sliders" :key="`${slide.id}`" class="slide">
        <img :src="`${slide.desktopImage}`" alt="" srcset="" loading="lazy" />
        <div class="swiper-lazy-preloader"></div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.slide {
  height: 100%;
}

.swiper {
  height: 100%;
}

.sliderWrapper {
  width: 100%;
  height: 646px;
  margin-bottom: 65px;
}
</style>
