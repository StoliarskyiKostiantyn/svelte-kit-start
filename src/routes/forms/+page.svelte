<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  import { z } from 'zod';

  // Схема валідації
  const schema = z.object({
    name: z.string().min(2, 'Ім\'я повинно містити мінімум 2 символи'),
    email: z.email('Введіть правильний email адрес')
  });

  // Стан форми
  let name = $state('');
  let email = $state('');
  let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Props для server action
  let { form }: { form: ActionData } = $props();

  // Валідація полів
  const nameValid = $derived(name.length >= 2);
  const emailValid = $derived(z.email().safeParse(email).success);
  const isFormValid = $derived(nameValid && emailValid);

  // Помилки валідації
  const nameError = $derived(name && !nameValid ? 'Ім\'я повинно містити мінімум 2 символи' : '');
  const emailError = $derived(email && !emailValid ? 'Введіть правильний email адрес' : '');

  // Обробка відповіді сервера
  $effect(() => {
    if (form?.success) {
      status = 'success';
      name = '';
      email = '';
    } else if (form?.errors) {
      status = 'error';
    }
  });
</script>

<form
  method="POST"
  action="?/create"
  class="max-w-md mx-auto p-6 space-y-4"
  use:enhance={() => {
    status = 'loading';
    return async ({ result, update }) => {
      status = result.type === 'success' ? 'success' : result.type === 'failure' ? 'error' : 'idle';
      await update();
    };
  }}
>
  <h2 class="text-2xl font-bold text-center mb-6">Форма реєстрації</h2>

  <!-- Ім'я -->
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
      Ім'я {nameValid && '✓'}
    </label>
    <input
      id="name"
      name="name"
      type="text"
      bind:value={name}
      required
      class="w-full p-3 border rounded-lg transition-colors
             {nameError ? 'border-red-500' : nameValid ? 'border-green-500' : 'border-gray-300'}"
      placeholder="Введіть ваше ім'я"
    />
    {#if nameError}
      <p class="text-red-500 text-sm mt-1">{nameError}</p>
    {/if}
  </div>

  <!-- Email -->
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
      Email {emailValid && '✓'}
    </label>
    <input
      id="email"
      name="email"
      type="email"
      bind:value={email}
      required
      class="w-full p-3 border rounded-lg transition-colors
             {emailError ? 'border-red-500' : emailValid ? 'border-green-500' : 'border-gray-300'}"
      placeholder="example@email.com"
    />
    {#if emailError}
      <p class="text-red-500 text-sm mt-1">{emailError}</p>
    {/if}
  </div>

  <!-- Кнопка відправки -->
  <button
    type="submit"
    disabled={status === 'loading' || !isFormValid}
    class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium
           disabled:opacity-50 disabled:cursor-not-allowed
           hover:bg-blue-600 transition-colors"
  >
    {status === 'loading' ? 'Відправка...' : 'Відправити'}
  </button>

  <!-- Повідомлення -->
  {#if status === 'success'}
    <div class="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
      ✅ Форма успішно відправлена!
    </div>
  {:else if status === 'error' && form?.errors}
    <div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
      ❌ Виникли помилки при відправці
    </div>
  {/if}
</form>
