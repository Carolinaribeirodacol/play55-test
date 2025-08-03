// stores/product.ts

import { defineStore } from 'pinia'
import type { Product } from '@/types/Product'
import { ref, computed } from 'vue'
import { z } from 'zod'

const searchSchema = z.string().min(1).max(100)

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const favoriteIds = ref<number[]>([])
  const showOnlyFavorites = ref(false)
  const searchTerm = ref('')

  async function fetchProducts() {
    isLoading.value = true
    error.value = null
    try {
      products.value = await $fetch<Product[]>('https://fakestoreapi.com/products')
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  function loadFavorites() {
    if (process.client) {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        try {
          favoriteIds.value = JSON.parse(saved)
        } catch {}
      }
    }
  }

  function saveFavorites() {
    if (process.client) {
      localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
    }
  }

  function toggleFavorite(id: number) {
    const index = favoriteIds.value.indexOf(id)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
    } else {
      favoriteIds.value.push(id)
    }
    saveFavorites()
  }

  function toggleFavoritesFilter() {
    showOnlyFavorites.value = !showOnlyFavorites.value
  }

  const filteredProducts = computed(() => {
    let filtered = products.value

    if (showOnlyFavorites.value) {
      filtered = filtered.filter(p => favoriteIds.value.includes(p.id))
    }

    if (searchTerm.value.trim()) {
      const result = searchSchema.safeParse(searchTerm.value.trim())
      if (result.success) {
        const term = result.data.toLowerCase()
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(term)
        )
      }
    }

    return filtered
  })

  if (process.client) {
    loadFavorites()
  }

  return {
    products,
    filteredProducts,
    searchTerm,
    isLoading,
    error,
    favoriteIds,
    showOnlyFavorites,
    fetchProducts,
    toggleFavorite,
    toggleFavoritesFilter,
    loadFavorites,
    saveFavorites,
  }
})
