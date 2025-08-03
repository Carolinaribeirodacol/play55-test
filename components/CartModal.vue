<template>
  <div
    v-if="cart.isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
      <header
        class="flex justify-between items-center border-b border-gray-200 w-full pb-2 mb-6"
      >
        <h2 class="text-lg font-bold">Meu carrinho</h2>
        <button
          @click="cart.closeModal"
          aria-label="Fechar modal"
          class="text-gray-500 hover:text-gray-900 transition"
        >
          ✕
        </button>
      </header>

      <p v-if="cart.items.length === 0" class="text-center font-semibold p-8">
        Seu carrinho está vazio.
      </p>

      <span v-else>
        <ul class="divide-y divide-gray-200 max-h-96 overflow-y-auto mb-6">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center py-4"
          >
            <img
              :src="item.image"
              alt="Imagem do produto"
              class="w-12 h-12 object-contain rounded-sm bg-gray-100"
            />

            <div class="flex-1 ml-4">
              <p class="font-semibold text-sm">{{ item.title }}</p>
              <p class="font-semibold text-sm text-indigo-600 mt-1">
                {{ formatPrice(item.price) }}
              </p>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="cart.removeOneFromCartById(item.id)"
                class="font-semibold text-gray-700 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                aria-label="Diminuir quantidade"
              >
                –
              </button>
              <span class="font-semibold w-5 text-center">{{
                item.quantity
              }}</span>
              <button
                @click="cart.addToCart(item)"
                class="font-semibold text-gray-700 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          </li>
        </ul>

        <div class="flex justify-between items-center font-semibold mb-6">
          <span>Total:</span>
          <span class="font-semibold text-indigo-600 text-lg">{{
            formatPrice(cart.totalPrice)
          }}</span>
        </div>

        <button
          @click="cart.checkout"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Finalizar Compra
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/utils/format";

const cart = useCartStore();
</script>
