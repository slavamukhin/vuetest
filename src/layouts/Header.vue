<script setup lang="ts">
import { RouterLink } from "vue-router";
import IconLogo from "@/components/icons/iconLogo.vue";
import IconBucket from "@/components/icons/iconBucket.vue";
import IconUser from "@/components/icons/iconUser.vue";
import { useBucketStore } from "@/stores/bucket";
import Toast from "@/components/Toast.vue";

const cardStore = useBucketStore();
</script>

<template>
  <header class="header">
    <Toast />
    <div class="logo">
      <RouterLink :to="{ name: 'main' }"><IconLogo /></RouterLink>
    </div>
    <nav class="menu">
      <RouterLink
        class="heading5 text-link"
        :to="{ name: 'shop' }"
        :class="{
          'is-active': ($route?.name as string).startsWith('product') || $route.name === 'shop',
        }"
      >
        Shop
      </RouterLink>
      <div class="separator"></div>
      <RouterLink class="icon-link" :to="{ name: 'bucket' }" active-class="is-active">
        <div class="icon-wrapper" v-badge="cardStore.bucketCount">
          <IconBucket />
        </div>
      </RouterLink>
      <RouterLink class="icon-link" :to="{ name: 'user' }" active-class="is-active">
        <div class="icon-wrapper"><IconUser /></div>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 64px 0 50px 0;
  height: 42px;
}

.logo {
  align-self: flex-end;
}

.menu {
  display: flex;
  align-items: stretch;
  height: 100%;
}

a {
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;
}

a.is-active {
  border-bottom: 2px solid var(--color-primary-black);
}

.separator {
  width: 1px;
  height: 17px;
  background-color: var(--color-secondary-dark-gray);
  align-self: center;
  margin-left: 78px;
  margin-right: 78px;
}

.text-link {
  font-weight: var(--font-weight-heading5);
  font-size: var(--font-size-heading5);
  line-height: var(--line-height-heading5);
}

.icon-link {
  margin-right: 39px;
}

.icon-link:last-child {
  margin-right: 0;
}
</style>
