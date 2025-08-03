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
    <footer class="bg-[#1F2937] text-white mt-10 py-10 px-4">
      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Coluna 1 -->
        <div>
          <h3 class="font-semibold mb-2">MinhaLoja</h3>
          <p class="text-sm text-gray-300">
            Sua loja online de confiança para encontrar os melhores produtos com os melhores preços.
          </p>
        </div>

        <!-- Coluna 2 -->
        <div>
          <h3 class="font-semibold mb-2">Links</h3>
          <ul class="text-sm text-gray-300 space-y-1">
            <li><a href="#" class="hover:underline">Início</a></li>
            <li><a href="#" class="hover:underline">Produtos</a></li>
            <li><a href="#" class="hover:underline">Sobre Nós</a></li>
            <li><a href="#" class="hover:underline">Política de Privacidade</a></li>
          </ul>
        </div>

        <!-- Coluna 3 -->
        <div>
          <h3 class="font-semibold mb-2">Fale Conosco</h3>
          <form class="space-y-2 text-sm">
            <input type="text" placeholder="Seu nome" class="w-full px-3 py-2 rounded bg-[#374151]" />
            <input type="email" placeholder="Seu e-mail" class="w-full px-3 py-2 rounded bg-[#374151]" />
            <input type="tel" placeholder="Seu telefone" class="w-full px-3 py-2 rounded bg-[#374151]" />
            <input type="date" class="w-full px-3 py-2 rounded bg-[#374151]" />
            <textarea placeholder="Sua mensagem" class="w-full px-3 py-2 rounded h-24 bg-[#374151]"></textarea>
            <button type="submit" class="w-full bg-[#4F46E5] text-white py-2 rounded hover:bg-indigo-700 transition">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>

      <!-- Créditos -->
      <div class="text-center text-sm text-gray-400 mt-6">
        © 2024 MinhaLoja. Todos os direitos reservados.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from '@/stores/product';
import CartModal from "~/components/CartModal.vue";

const cart = useCartStore();
const productStore = useProductStore();

productStore.fetchProducts();
</script>
