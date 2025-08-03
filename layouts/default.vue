<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <CartModal />

    <Header />

    <!-- Conteúdo principal -->
    <main class="max-w-3xl mx-auto flex-1 bg-[#F9FAFB] px-4 sm:px-0">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/product";
import CartModal from "~/components/CartModal.vue";
import Footer from "~/components/layout/Footer.vue";
import Header from "~/components/layout/Header.vue";

const productStore = useProductStore();

productStore.fetchProducts();
</script>
