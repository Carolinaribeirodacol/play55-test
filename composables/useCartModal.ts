import { ref } from 'vue';

const isCartModalOpen = ref(false);

export function useCartModal() {
  const openCartModal = () => {
    isCartModalOpen.value = true;
  };

  const closeCartModal = () => {
    isCartModalOpen.value = false;
  };

  return {
    isCartModalOpen,
    openCartModal,
    closeCartModal,
  };
}
