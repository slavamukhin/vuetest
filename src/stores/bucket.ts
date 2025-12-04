import { computed, ref, type ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import { wrapperLocalStorage } from '@/core/Cashe/unifiedStorage';

interface BucketItem {
  id: number,
  count: number
}

const key = 'bucket-store';

export const useBucketStore = defineStore('bucket', () => {
  const bucket = ref<Map<number, BucketItem>>(new Map());

  const AddProduct = (id: number, count: number = 1): void => {
    const item = bucket.value.get(id);

    if (item != null) {
      item.count += count;
    } else {
      bucket.value.set(id, { id, count });
    }
  }

  const removeProduct = (id: number): void => {
    if (bucket.value.has(id)) {
      bucket.value.delete(id);
    }
  }

  const bucketCount = computed(() => {
    return [...bucket.value.values()].reduce((acc, item) => {
      return acc + (item?.count ?? 0);
    }, 0);
  })

  const getCountInBucket = (id: number): ComputedRef<number> => {
    return computed(() => bucket.value.get(id)?.count ?? 0);
  }

  return { AddProduct, removeProduct, bucketCount, bucket, getCountInBucket }
}, {
  persist: {
    key,
    storage: localStorage,
    serializer: {
      serialize: wrapperLocalStorage.serialize,
      deserialize: wrapperLocalStorage.deserialize as () => Map<number, BucketItem>,
    }
  }
});
