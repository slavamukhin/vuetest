import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Promos } from '@/types/promo';

export const usePromoStore = defineStore('promo', () => {
  const sliders = ref<Promos[]>([]);
  const activeIndex = ref<number | null>(null);


  async function fetchSliders(): Promise<void> {
    if (sliders.value.length > 0) return;
    const res = await fetch("https://api.dev.cwe.su/api/promos/?populate=*");
    const json = await res.json();
    sliders.value = json.data;
    activeIndex.value = 0;
  }

  const setActiveIndex = (index: number): void => {
    if (index > sliders.value.length - 1 || index < 0) {
      activeIndex.value = 0;
    } else {
      activeIndex.value = index;
    }
  }

  const getCurrentSlide = computed((): Promos => {
    return sliders.value[activeIndex.value as number];
  });

  return { sliders, activeIndex, fetchSliders, setActiveIndex, getCurrentSlide };
}, {
  persist: {
    key: 'promo-storage',
    storage: sessionStorage
  }
});
