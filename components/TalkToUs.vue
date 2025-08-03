<template>
  <form @submit.prevent="submitForm" novalidate class="space-y-4 text-gray-900">
    <div>
      <input
        v-model="form.nome"
        type="text"
        placeholder="Seu nome"
        class="w-full px-3 py-2 rounded border border-gray-300"
        :class="{ 'border-red-500': errors.nome }"
      />
      <p v-if="errors.nome" class="text-red-600 text-sm mt-1">{{ errors.nome }}</p>
    </div>

    <div>
      <input
        v-model="form.email"
        type="email"
        placeholder="Seu e-mail"
        class="w-full px-3 py-2 rounded border border-gray-300"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <input
        v-mask="'(##) #####-####'"
        v-model="form.telefone"
        type="tel"
        placeholder="Seu telefone"
        class="w-full px-3 py-2 rounded border border-gray-300"
        :class="{ 'border-red-500': errors.telefone }"
      />
      <p v-if="errors.telefone" class="text-red-600 text-sm mt-1">{{ errors.telefone }}</p>
    </div>

    <div>
      <input
        v-model="form.nascimento"
        type="date"
        class="w-full px-3 py-2 rounded border border-gray-300"
        :class="{ 'border-red-500': errors.nascimento }"
        max="2024-12-31"
      />
      <p v-if="errors.nascimento" class="text-red-600 text-sm mt-1">{{ errors.nascimento }}</p>
    </div>

    <div>
      <textarea
        v-model="form.mensagem"
        placeholder="Sua mensagem"
        class="w-full px-3 py-2 rounded border border-gray-300 h-24 resize-none"
        :class="{ 'border-red-500': errors.mensagem }"
      ></textarea>
      <p v-if="errors.mensagem" class="text-red-600 text-sm mt-1">{{ errors.mensagem }}</p>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
    >
      {{ loading ? 'Enviando...' : 'Enviar Mensagem' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { z } from 'zod'
import { useRecaptcha } from '@/composables/useRecaptcha'

const loading = ref(false)

const form = reactive({
  nome: '',
  email: '',
  telefone: '',
  nascimento: '',
  mensagem: '',
})

const errors = reactive<Record<string, string | null>>({
  nome: null,
  email: null,
  telefone: null,
  nascimento: null,
  mensagem: null,
})

const schema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido (ex: (99) 99999-9999)'),
  nascimento: z
    .string()
    .refine(val => {
      if (!val) return false
      const data = new Date(val)
      return data <= new Date()
    }, 'Data de nascimento inválida'),
  mensagem: z.string().min(1, 'Mensagem é obrigatória'),
})

const { executeRecaptcha } = useRecaptcha()

function clearErrors() {
  Object.keys(errors).forEach(key => {
    errors[key] = null
  })
}

async function submitForm() {
  clearErrors()
  try {
    schema.parse(form)
    loading.value = true

    const token = await executeRecaptcha('form_submit')

    const res = await fetch('https://SEU_DOMINIO_AQUI/validar-recaptcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, token }),
    })

    if (!res.ok) throw new Error('Erro ao enviar o formulário')

    alert('Mensagem enviada com sucesso!')
    Object.keys(form).forEach(key => (form[key] = ''))
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.errors.forEach(e => {
        if (e.path[0]) errors[e.path[0] as string] = e.message
      })
    } else {
      alert((err as Error).message || 'Erro desconhecido')
    }
  } finally {
    loading.value = false
  }
}
</script>
