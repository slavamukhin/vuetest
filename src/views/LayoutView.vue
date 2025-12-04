<script setup lang="ts">
import Layout from "@/layouts/Layout.vue";
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
</script>

<template>
  <Layout>
    <template #header>
      <Header></Header>
    </template>
    <template #default>
      <main class="contentWrapper">
        <router-view />
      </main>
    </template>
    <template #footer>
      <Footer></Footer>
    </template>
  </Layout>
</template>

<style scoped>
.contentWrapper {
  flex: 1 0 auto;
}
</style>
