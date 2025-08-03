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
    coupon: '',
    discount: 0,
    isValidCoupon: false,
  }),

  getters: {
    totalPrice: (state) => {
      const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return total * (1 - state.discount)
    },
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
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
      this.discount = 0
      this.coupon = ''
      this.isValidCoupon = false
      this.closeModal()
    },

    async applyCoupon(code: string) {
      await new Promise((r) => setTimeout(r, 500))

      const validCoupons = {
        NUVEM10: 0.1,
        DESCONTO20: 0.2,
      }

      const discount = validCoupons[code.toUpperCase()]

      if (!discount) {
        this.coupon = ''
        this.discount = 0
        this.isValidCoupon = false
        throw new Error('Cupom inválido')
      }

      this.coupon = code.toUpperCase()
      this.discount = discount
      this.isValidCoupon = true
    }
  },
})
