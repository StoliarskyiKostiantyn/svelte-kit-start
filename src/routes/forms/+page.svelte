<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { z } from 'zod';
	import { Button } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';
	import { createForm } from '@tanstack/svelte-form';
	import FieldInfo from '../../lib/Fieldinfo.svelte';

	async function handleSubmitTanstack(data: any) {
		const formData = new FormData();
		formData.append('firstName', data.firstName); // або data.name, якщо так називається поле
		formData.append('lastName', data.lastName);

		formData.append('employed', data.employed);
		formData.append('jobTitle', data.jobTitle);

		const response = await fetch('?/create2', {
			method: 'POST',
			body: formData
		});

		// Обробіть відповідь, якщо потрібно
		const result = await response.json();
		alert(JSON.stringify(result));
		// ...далі ваша логіка
	}
	const tanstackForm = createForm(() => ({
		defaultValues: {
			firstName: '',
			lastName: '',
			employed: false,
			jobTitle: ''
		},
		onSubmit: async ({ value }) => {
			await handleSubmitTanstack(value);
		}
	}));

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

<form
	id="form"
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		tanstackForm.handleSubmit();
	}}
	class="mx-auto max-w-md space-y-4 rounded-lg bg-gray-50 p-6 shadow"
>
	<h1 class="mb-6 text-center text-2xl font-bold text-blue-600">TanStack Form - Svelte Demo</h1>

	<tanstackForm.Field
		name="firstName"
		validators={{
			onChange: ({ value }) => (value.length < 3 ? 'Not long enough' : undefined),
			onChangeAsyncDebounceMs: 500,
			onChangeAsync: async ({ value }) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				return value.includes('error') && 'No "error" allowed in first name';
			}
		}}
	>
		{#snippet children(field)}
			<div class="mb-4">
				<label for={field.name} class="mb-1 block text-sm font-medium text-gray-700"
					>First Name</label
				>
				<input
					id={field.name}
					type="text"
					placeholder="First Name"
					value={field.state.value}
					onblur={() => field.handleBlur()}
					oninput={(e: Event) => {
						const target = e.target as HTMLInputElement;
						field.handleChange(target.value);
					}}
					class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-blue-500 focus:ring focus:ring-blue-200"
				/>
				<FieldInfo {field} />
			</div>
		{/snippet}
	</tanstackForm.Field>
	<tanstackForm.Field
		name="lastName"
		validators={{
			onChange: ({ value }) => (value.length < 3 ? 'Not long enough' : undefined)
		}}
	>
		{#snippet children(field)}
			<div class="mb-4">
				<label for={field.name} class="mb-1 block text-sm font-medium text-gray-700"
					>Last Name</label
				>
				<input
					id={field.name}
					type="text"
					placeholder="Last Name"
					value={field.state.value}
					onblur={() => field.handleBlur()}
					oninput={(e: Event) => {
						const target = e.target as HTMLInputElement;
						field.handleChange(target.value);
					}}
					class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-blue-500 focus:ring focus:ring-blue-200"
				/>
				<FieldInfo {field} />
			</div>
		{/snippet}
	</tanstackForm.Field>
	<tanstackForm.Field name="employed">
		{#snippet children(field)}
			<div class="mb-4 flex items-center gap-2">
				<input
					oninput={() => field.handleChange(!field.state.value)}
					checked={field.state.value}
					onblur={() => field.handleBlur()}
					id={field.name}
					type="checkbox"
					class="rounded border-gray-300 focus:ring-blue-500"
				/>
				<label for={field.name} class="text-sm font-medium text-gray-700">Employed?</label>
			</div>
			{#if field.state.value}
				<tanstackForm.Field
					name="jobTitle"
					validators={{
						onChange: ({ value }) =>
							value.length === 0 ? 'If you have a job, you need a title' : null
					}}
				>
					{#snippet children(field)}
						<div class="mb-4">
							<label for={field.name} class="mb-1 block text-sm font-medium text-gray-700"
								>Job Title</label
							>
							<input
								type="text"
								id={field.name}
								placeholder="Job Title"
								value={field.state.value}
								onblur={field.handleBlur}
								oninput={(e: Event) => {
									const target = e.target as HTMLInputElement;
									field.handleChange(target.value);
								}}
								class="focus:ring-opacity-50 w-full rounded-lg border border-gray-300 p-3 transition-colors focus:border-blue-500 focus:ring focus:ring-blue-200"
							/>
							<FieldInfo {field} />
						</div>
					{/snippet}
				</tanstackForm.Field>
			{/if}
		{/snippet}
	</tanstackForm.Field>
	<div class="mt-6 flex gap-2">
		<tanstackForm.Subscribe
			selector={(state) => ({
				canSubmit: state.canSubmit,
				isSubmitting: state.isSubmitting
			})}
		>
			{#snippet children({ canSubmit, isSubmitting })}
				<button
					type="submit"
					disabled={!canSubmit}
					class="w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</button>
			{/snippet}
		</tanstackForm.Subscribe>
		<button
			type="button"
			id="reset"
			onclick={() => {
				tanstackForm.reset();
			}}
			class="w-full rounded-lg bg-gray-300 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-400"
		>
			Reset
		</button>
	</div>
</form>
