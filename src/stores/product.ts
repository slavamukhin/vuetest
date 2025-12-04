import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import type { Product, QueryParams } from '@/types/product';
import { LRU, Cashe } from "@/core/Cashe";
import { localStorageTTL } from '@/core/Cashe/unifiedStorage';

interface ProductMap {
  [pageId: number]: {
    [productId: number]: Product;
  };
};

interface Pagination {
  page: number
  pageSize: number
  pageCount?: number
  total: number
}

const initPagination = {
  page: 1,
  pageSize: 6,
  total: 0
}

const cacheKey = 'product-lru';
const LVPCacheKey = 'last-view-product-lru'

export const useProductStore = defineStore('product', () => {
  const initCashe = localStorageTTL.load(cacheKey) as Map<number, Product> ?? new Map<number, Product>();
  const initLastViewCashe = localStorageTTL.load(LVPCacheKey) as Map<number, Product> ?? new Map<number, Product>();
  const cache = reactive(new Cashe<number, Product>(new LRU(20, initCashe)));
  const lastViewCache = reactive(new Cashe<number, Product>(new LRU(6, initLastViewCashe)));
  const productList = ref<ProductMap>({});
  const pagination = ref<Pagination>(initPagination);

  const queryParams = reactive<QueryParams>({
    search: '',
    inStock: false,
    onSell: false,
    sorted: ''
  });

  watch(
    lastViewCache,
    (val) => {
      localStorageTTL.save(LVPCacheKey, val.getCurrentInstance());
    },
    { deep: true }
  );

  watch(
    cache,
    (val) => {
      localStorageTTL.save(cacheKey, val.getCurrentInstance());
    },
    { deep: true }
  );

  watch(
    () => pagination.value.page,
    async (value, oldValue) => {
      await fetchProductList(value, oldValue);
    }
  );

  watch(
    queryParams,
    async () => {
      pagination.value = initPagination;
      productList.value = {};
      await fetchProductList();
    },
    { deep: true }
  );

  const buildUrl = computed((): URL => {
    const url = new URL('https://api.dev.cwe.su/api/products/');

    const params = url.searchParams;
    params.set('populate', '*');
    params.set('pagination[page]', String(pagination.value.page));
    params.set('pagination[pageSize]', String(pagination.value.pageSize));

    if (queryParams.search) params.set('filters[title][$containsi]', queryParams.search);
    if (queryParams.inStock) params.set('filters[itemsInStock][$gt]', '0');
    if (queryParams.onSell) params.set('filters[discountPercent][$gt]', '0');
    if (queryParams.sorted) params.set('sort', `${queryParams.sorted}:ASC`);

    return url;
  });

  const fetchProductList = async (page: number = 1, currentPage?: number): Promise<void> => {
    if (productList.value[page] != null) {
      return;
    } else if (currentPage) {
      productList.value[page] = productList.value[currentPage];
    }

    const res = await fetch(buildUrl.value);
    const json = await res.json();
    const data = json.data.reduce((acc: Record<Product['id'], Product>, item: Product) => {
      return {
        ...acc,
        [item.id]: item
      }
    }, {});

    if (lastViewCache.size() === 0) {
      for (const product of json.data) {
        lastViewCache.set(product.id, product);
      }
    }
    productList.value[json.meta.pagination.page] = { ...data };
    pagination.value = json.meta.pagination;
  };

  const setPage = (page: number) => {
    pagination.value.page = page;
  }

  // Получаем продукт для страницы продуктов, из списка продуктов, кеша LRU на 20 элементов сохраняем в localStorage,
  // делаем запрос если не находим, добавляем в кеш
  const getProduct = async (id: number, view?: boolean): Promise<Product> => {
    // Ищем в продуктах
    let product: Product | undefined;
    for (const productPage of Object.values(productList.value)) {
      if (productPage[id] != null) {
        console.log('Возвращаю из продуктов')

        if (view) {
          lastViewCache.set(id, productPage[id]);
          console.log('Добавил в последние просмотренные');
        }
        return productPage[id];
      }
    }

    // Ищем в кеше
    product = cache.get(id);

    if (product != null) {
      console.log('Возвращаю из кеша');
      if (view) {
        lastViewCache.set(id, product);
        console.log('Добавил в последние просмотренные');
      }
      return product;
    };

    // Делаем запрос и ложим в кеш
    const res = await fetch(`https://api.dev.cwe.su/api/products/?filters[id][$eq]=${id}&populate=*`);
    const json = await res.json();
    cache.set(id, json.data[0]);
    console.log('Сделал запрос');
    if (view) {
      lastViewCache.set(id, json.data[0]);
      console.log('Добавил в последние просмотренные');
    }
    return cache.get(id)!;
  }

  const setQueryParams = (changedParam: Partial<QueryParams>): void => {
    Object.assign(queryParams, changedParam)
  }

  const lastViewProducts = computed(() => {
    return lastViewCache.getValues();
  })

  return { productList, fetchProductList, setPage, getProduct, pagination, setQueryParams, queryParams, lastViewProducts };
});

// Поток при работе с каталогом (пагинация на бэке)

// 1. Пользователь открывает каталог → fetchProductList():

// 2. Если нет → запрашиваем API → кладём продукты в productList[page].

// 3. Кеш для страниц не используется — страницы напрямую в productList.

// Переход по пагинации:

// 1. Если страница уже есть в productList → мгновенный рендер.

// 2. Если нет → подставляем скелетон - текущая страница, параллельно делаем API-запрос → результат сохраняем в productList[page].

// Когда нужен отдельный продукт (getProduct(id)):

// 1. Сначала ищем по всем страницам в productList.

// 2. Если не нашли → ищем в Cashe.

// 3. Если и там нет → запрос к API → кладём в Cashe.

// Корзина и фавориты:

// 1. Хранят только id и count (id для фаворит).

// 2. Для рендера товаров → сначала пробуем достать из productList → затем из Cashe → если нет, API → кладём в Cashe.

// 3. При каждом изменении записываем в localStorage (для сохранения между вкладками, через унифицированную обертку), при перегрузке страницы инициализируем если есть.

// QueryParams (при любом изменении):

// 1. Очищаем productList и initPagination, все по новой.

// 2. Формируем урл (buildUrl с параметрами)

// Кеш (LRU размером 20):

// 1. При каждом изменении записываем в localStorage с TTL (для сохранения между вкладками, через унифицированную обертку), при перегрузке страницы инициализируем если есть.

// Кеш (LRU размером 6):

// 1. Хранит в себе 6 последних просмотренных продуктов для отображения блока последних просмотренних на главной.

// 2. Прогревается при первом запросе fetchProductList(), если пустой.

// 3. Добавляется каждый раз новый продукт если открыли страницу этого продукта.

// 4. При каждом изменении записываем в localStorage с TTL (для сохранения между вкладками, через унифицированную обертку), при перегрузке страницы инициализируем если есть.
