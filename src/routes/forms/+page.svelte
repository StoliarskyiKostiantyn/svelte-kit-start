<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { z } from 'zod';
	import { Button } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';

	// Схема валідації
	const schema = z.object({
		name: z.string().min(2, "Ім'я повинно містити мінімум 2 символи"),
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
	const nameError = $derived(name && !nameValid ? "Ім'я повинно містити мінімум 2 символи" : '');
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

<Button href="/" color="light" class="inline-flex items-center">
	<HomeSolid class="me-2 h-4 w-4" />
	На головну
</Button>
<form
	method="POST"
	action="?/create"
	class="mx-auto max-w-md space-y-4 p-6"
	use:enhance={() => {
		status = 'loading';
		return async ({ result, update }) => {
			status = result.type === 'success' ? 'success' : result.type === 'failure' ? 'error' : 'idle';
			await update();
		};
	}}
>
	<h2 class="mb-6 text-center text-2xl font-bold">Форма реєстрації</h2>

	<!-- Ім'я -->
	<div>
		<label for="name" class="mb-1 block text-sm font-medium text-gray-700">
			Ім'я {nameValid && '✓'}
		</label>
		<input
			id="name"
			name="name"
			type="text"
			bind:value={name}
			required
			class="w-full rounded-lg border p-3 transition-colors
             {nameError ? 'border-red-500' : nameValid ? 'border-green-500' : 'border-gray-300'}"
			placeholder="Введіть ваше ім'я"
		/>
		{#if nameError}
			<p class="mt-1 text-sm text-red-500">{nameError}</p>
		{/if}
	</div>

	<!-- Email -->
	<div>
		<label for="email" class="mb-1 block text-sm font-medium text-gray-700">
			Email {emailValid && '✓'}
		</label>
		<input
			id="email"
			name="email"
			type="email"
			bind:value={email}
			required
			class="w-full rounded-lg border p-3 transition-colors
             {emailError ? 'border-red-500' : emailValid ? 'border-green-500' : 'border-gray-300'}"
			placeholder="example@email.com"
		/>
		{#if emailError}
			<p class="mt-1 text-sm text-red-500">{emailError}</p>
		{/if}
	</div>

	<!-- Кнопка відправки -->
	<button
		type="submit"
		disabled={status === 'loading' || !isFormValid}
		class="w-full rounded-lg bg-blue-500 py-3 font-medium text-white
           transition-colors hover:bg-blue-600
           disabled:cursor-not-allowed disabled:opacity-50"
	>
		{status === 'loading' ? 'Відправка...' : 'Відправити'}
	</button>

	<!-- Повідомлення -->
	{#if status === 'success'}
		<div class="rounded-lg border border-green-400 bg-green-100 p-4 text-center text-green-700">
			✅ Форма успішно відправлена!
		</div>
	{:else if status === 'error' && form?.errors}
		<div class="rounded-lg border border-red-400 bg-red-100 p-4 text-center text-red-700">
			❌ Виникли помилки при відправці
		</div>
	{/if}
</form>
