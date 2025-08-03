<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <CartModal />

    <!-- Header -->
    <header class="bg-white shadow mb-6">
      <div class="max-w-3xl mx-auto py-4 flex items-center justify-between px-4 sm:px-0">
        <div class="text-lg font-bold">MinhaLoja</div>

        <div class="flex-1 mx-4">
          <input
            type="text"
            v-model="productStore.searchTerm"
            placeholder="Pesquisar produtos..."
            class="w-full px-4 py-2 rounded-full bg-[#F3F4F6] text-sm focus:outline-none"
          />
        </div>

        <div class="flex items-center gap-4">
          <!-- Botão de favoritos -->
          <button
            title="Favoritos"
            @click="productStore.toggleFavoritesFilter"
            class="p-1 rounded-full transition"
            :class="productStore.showOnlyFavorites ? 'text-red-500' : 'text-gray-700 hover:text-red-500'"
          >
            <Icon
              :icon="productStore.showOnlyFavorites ? 'mdi:heart' : 'mdi:heart-outline'"
              class="text-xl"
            />
          </button>

          <!-- Botão de carrinho -->
          <button title="Carrinho" @click="cart.openModal" class="text-gray-700 hover:text-indigo-600">
            <Icon icon="mdi:cart" class="text-xl" />
          </button>
        </div>
      </div>
    </header>

    <!-- Conteúdo principal -->
    <main class="max-w-3xl mx-auto flex-1 bg-[#F9FAFB] px-4 sm:px-0">
      <NuxtPage />
    </main>

    <!-- Rodapé -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from '@/stores/product';
import CartModal from "~/components/CartModal.vue";
import Footer from "~/components/Footer.vue";

const cart = useCartStore();
const productStore = useProductStore();

productStore.fetchProducts();
</script>
