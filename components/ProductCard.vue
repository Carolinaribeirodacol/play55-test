<template>
  <div class="relative bg-white rounded-lg shadow p-4 grid grid-rows-[auto_auto_auto_1fr_auto] gap-1">
    <button @click="emit('toggle-favorite')" class="absolute top-3 right-3 bg-white p-1 rounded-full shadow transition">
      <Icon :icon="isFavorited ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'" class="text-red-500 hover:text-red-500 transition text-xl" />
    </button>
    <img :src="props.product.image" alt="product-image" class="h-40 mx-auto object-contain mb-6" />

    <h2 class="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{{ props.product.title }}</h2>
    <p class="text-sm text-gray-400">{{ props.product.category }}</p>
    <p class="text-lg font-semibold text-gray-800">{{ formatPrice(props.product.price) }}</p>

    <button
      @click="handleAddToCart"
      class="bg-blueViolet hover:bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-700 transition w-full self-end mt-2"
    >
      Adicionar
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Product } from "@/types/Product";
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  product: Product
  isFavorited: boolean
}>();

const cart = useCartStore()

const emit = defineEmits<{
  (e: 'toggle-favorite'): void
}>()

function handleAddToCart() {
  cart.addToCart({
    id: props.product.id,
    title: props.product.title,
    price: props.product.price,
    image: props.product.image,
    category: props.product.category,
  })
  cart.openModal()
}
</script>
