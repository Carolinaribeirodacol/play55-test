<template>
  <div>
    <button
      @click="productStore.toggleFavoritesFilter"
      class="mb-4 text-gray-700 font-semibold hover:underline text-sm flex items-center pl-4"
    >
      <Icon
        :icon="productStore.showOnlyFavorites ? 'mdi:filter' : 'mdi:filter-outline'"
        class="mr-2 text-lg"
      />
      {{ productStore.showOnlyFavorites ? "Ver todos" : "Ver favoritos" }}
    </button>

    <div v-if="productStore.isLoading" class="text-center py-4">Carregando...</div>
    <div v-else-if="productStore.error" class="text-center py-4 text-red-500">
      Erro ao carregar produtos.
    </div>

    <div v-else-if="productStore.filteredProducts.length === 0" class="text-center py-4 text-gray-500">
      Nenhum produto encontrado.
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <ProductCard
        v-for="product in productStore.filteredProducts"
        :key="product.id"
        :product="product"
        :isFavorited="productStore.favoriteIds.includes(product.id)"
        @toggle-favorite="() => productStore.toggleFavorite(product.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/product";
import { Icon } from "@iconify/vue";

const productStore = useProductStore()
</script>
