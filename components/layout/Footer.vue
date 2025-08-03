<template>
  <footer class="bg-ebonyClay text-white mt-10 py-10 px-4">
    <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 class="font-semibold mb-2">MinhaLoja</h3>
        <p class="text-sm text-grayChateau">
          Sua loja online de confiança para encontrar os melhores produtos com os melhores preços.
        </p>
      </div>

      <div>
        <h3 class="font-semibold mb-2">Links</h3>
        <ul class="text-sm space-y-3">
          <li><a href="#" class="hover:underline text-grayChateau">Início</a></li>
          <li><a href="#" class="hover:underline text-grayChateau">Produtos</a></li>
          <li><a href="#" class="hover:underline text-grayChateau">Sobre Nós</a></li>
          <li><a href="#" class="hover:underline text-grayChateau">Política de Privacidade</a></li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold mb-2">Fale Conosco</h3>
        <client-only>
          <TalkToUs />
        </client-only>
      </div>
    </div>

    <div class="text-center text-sm text-grayChateau mt-6">
      © 2024 MinhaLoja. Todos os direitos reservados.
    </div>
  </footer>
</template>

<script setup lang="ts">
import TalkToUs from '@/components/TalkToUs.vue'
</script>
