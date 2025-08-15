import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { wrapperLocalStorage } from '@/core/Cashe/unifiedStorage';

const key = 'favorit-list-storage';

export const useFavoriteStore = defineStore('favoriteList', () => {
  const favoriteList = ref<Record<string, number>>({});

  const toggleItem = (id: number) => {
    const count = favoriteList.value[id];
    if (count == null) {
      favoriteList.value[id] = 1;
    } else {
      delete favoriteList.value[id];
    }
  }

  const isFavorite = (id: number): boolean => {
    return favoriteList.value[id] != null;
  }

  return { favoriteList, toggleItem, isFavorite };
}, {
  persist: {
    key,
    storage: localStorage
  }
});
