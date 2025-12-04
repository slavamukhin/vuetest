<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useGlobalEventBus } from "@/composables/useGlobalEventBus";
import type { GlobalEventMap } from "@/composables/useGlobalEventBus";
import IconCicle from "./icons/IconCicle.vue";

const toastList = ref<GlobalEventMap["notification"][]>([]);

useGlobalEventBus("notification", (payload) => {
  toastList.value.push(payload);
  setTimeout(() => {
    toastList.value.shift();
  }, 3000);
});
</script>
<template>
  <div v-for="notification in toastList" class="wrapper">
    <div class="text-wraper">
      <div class="icon"><IconCicle /></div>
      <div class="heading5">{{ notification.text }}</div>
    </div>
    <RouterLink class="link body-large" :to="{ name: notification.routeName ?? 'bucket' }">
      {{ notification.buttonText ?? "VIEW CARD" }}
    </RouterLink>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  top: 0;
  z-index: 50;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 1248px;
  margin: auto;
  padding: 24px 39px;
  background-color: var(--color-secondary-light-gray);
}

.text-wraper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.link {
  color: var(--color-primary-accent);
}

.icon svg {
  display: block;
}
</style>
