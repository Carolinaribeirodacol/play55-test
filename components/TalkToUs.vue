<template>
  <form @submit.prevent="submitForm" novalidate class="space-y-4 text-gray-900">
    <div>
      <input
        v-model="form.nome"
        type="text"
        placeholder="Seu nome"
        class="w-full px-3 py-2 rounded border border-[#4B5563] bg-[#374151] text-[#9CA3AF]"
        :class="{ 'border-red-500': errors.nome }"
      />
      <p v-if="errors.nome" class="text-red-600 text-sm mt-1">{{ errors.nome }}</p>
    </div>

    <div>
      <input
        v-model="form.email"
        type="email"
        placeholder="Seu e-mail"
        class="w-full px-3 py-2 rounded border border-[#4B5563] bg-[#374151] text-[#9CA3AF]"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <input
        ref="telefoneInput"
        type="tel"
        placeholder="(00) 00000-0000"
        class="w-full px-3 py-2 rounded border border-[#4B5563] bg-[#374151] text-[#9CA3AF]"
        :class="{ 'border-red-500': errors.telefone }"
      />
      <p v-if="errors.telefone" class="text-red-600 text-sm mt-1">{{ errors.telefone }}</p>
    </div>

    <div>
      <input
        v-model="form.nascimento"
        type="date"
        class="w-full px-3 py-2 rounded border border-[#4B5563] bg-[#374151] text-[#9CA3AF]"
        :class="{ 'border-red-500': errors.nascimento }"
        max="2024-12-31"
      />
      <p v-if="errors.nascimento" class="text-red-600 text-sm mt-1">{{ errors.nascimento }}</p>
    </div>

    <div>
      <textarea
        v-model="form.mensagem"
        placeholder="Sua mensagem"
        class="w-full px-3 py-2 rounded border border-[#4B5563] bg-[#374151] text-[#9CA3AF] h-24 resize-none"
        :class="{ 'border-red-500': errors.mensagem }"
      ></textarea>
      <p v-if="errors.mensagem" class="text-red-600 text-sm mt-1">{{ errors.mensagem }}</p>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
    >
      {{ loading ? "Enviando..." : "Enviar Mensagem" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { z, ZodError } from "zod";
import { useRecaptcha } from "@/composables/useRecaptcha";
import IMask from "imask";
import type { InputMask } from "imask"

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  mensagem: string;
}

type FormErrors = Partial<Record<keyof FormData, string | null>>;

const loading = ref(false);

const form = reactive<FormData>({
  nome: "",
  email: "",
  telefone: "",
  nascimento: "",
  mensagem: "",
});

const errors = reactive<FormErrors>({
  nome: null,
  email: null,
  telefone: null,
  nascimento: null,
  mensagem: null,
});

const telefoneInput = ref<HTMLInputElement | null>(null);
let mask: InputMask | null = null

onMounted(() => {
  if (telefoneInput.value) {
    mask = IMask(telefoneInput.value, {
      mask: [
        { mask: "(00) 0000-0000" },
        { mask: "(00) 00000-0000" },
      ],
      dispatch(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        return number.length > 10
          ? dynamicMasked.compiledMasks[1]
          : dynamicMasked.compiledMasks[0];
      },
    });

    mask.on("accept", () => {
      form.telefone = mask?.value || "";
    });
  }
});

onBeforeUnmount(() => {
  mask?.destroy();
});

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido (ex: (99) 99999-9999)"),
  nascimento: z
    .string()
    .refine((val) => {
      if (!val) return false;
      const data = new Date(val);
      return data <= new Date();
    }, "Data de nascimento inválida"),
  mensagem: z.string().min(1, "Mensagem é obrigatória"),
});

const { executeRecaptcha } = useRecaptcha();

function clearErrors(): void {
  (Object.keys(errors) as (keyof FormErrors)[]).forEach((key) => {
    errors[key] = null;
  });
}

async function submitForm(): Promise<void> {
  clearErrors();
  try {
    schema.parse(form);
    loading.value = true;

    const token = await executeRecaptcha("form_submit");

    const res = await fetch("/api/validate-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, token }),
    })

    if (!res.ok) throw new Error("Erro ao enviar o formulário");

    alert("Mensagem enviada com sucesso!");

    Object.assign(form, {
      nome: "",
      email: "",
      telefone: "",
      nascimento: "",
      mensagem: "",
    });

    if (mask) mask.value = "";
  } catch (err) {
    if (err instanceof ZodError) {
      err.errors.forEach((e) => {
        const path = e.path[0] as keyof FormErrors;
        if (path) errors[path] = e.message;
      });
    } else if (err instanceof Error) {
      alert(err.message || "Erro desconhecido");
    } else {
      alert("Erro inesperado");
    }
  } finally {
    loading.value = false;
  }
}
</script>
