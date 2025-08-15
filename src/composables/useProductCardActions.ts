import { useRouter } from "vue-router";
import { useBucketStore } from "@/stores/bucket";
import { useFavoriteStore } from "@/stores/favoriteLisr";
import { dispatchEvent } from "@/composables/useGlobalEventBus";
import type { Product } from "@/types/product";

export function useProductCardActions() {
  const router = useRouter();
  const bucketStore = useBucketStore();
  const favoriteStore = useFavoriteStore();

  const getActions = (card: Product) => ({
    onAddToCard: () => {
      if (card.itemsInStock <= bucketStore.getCountInBucket(card.id).value) {
        dispatchEvent("notification", {
          text: `U can't add more ${card.title} to your shopping bag.`,
        });
        return;
      }
      bucketStore.AddProduct(card.id);
      dispatchEvent("notification", {
        text: `${card.title} added to your shopping bag.`,
      });
    },
    onViewProduct: () =>
      router.push({ name: "product", params: { id: card.id } }),
    onFavorite: () => {
      favoriteStore.toggleItem(card.id);
      dispatchEvent("notification", {
        text: `${card.title} ${favoriteStore.isFavorite(card.id) ? "added" : "removed"
          } to your favorite list.`,
        buttonText: "VIEW FAVORITE LIST",
        routeName: "favorite",
      });
    },
  });

  return { getActions };
}
