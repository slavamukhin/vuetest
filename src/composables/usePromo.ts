import { usePromoStore } from "@/stores/promo";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export function usePromo() {
  const promoStore = usePromoStore();
  const router = useRouter();

  onMounted(async () => {
    await promoStore.fetchSliders();
    promoStore.setActiveIndex(0);
  });

  const promo = computed(() => ({
    title: promoStore.getCurrentSlide?.product?.title ?? '',
    price: `$${promoStore.getCurrentSlide?.product?.price},00`,
    navigate: () =>
      router.push({ name: 'product', params: { id: promoStore.getCurrentSlide?.product?.id } }),
  }))

  return { promo }
}
