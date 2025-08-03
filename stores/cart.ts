import { defineStore } from 'pinia'

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  category?: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isModalOpen: false,
  }),

  getters: {
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const item = this.items.find((i) => i.id === product.id)
      if (item) {
        item.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeOneFromCartById(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.items = this.items.filter((i) => i.id !== id)
      }
    },

    openModal() {
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
    },

    checkout() {
      alert('Compra finalizada!')
      this.items = []
      this.closeModal()
    },
  },
})
