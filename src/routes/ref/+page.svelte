<script>
	import { Button } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';
	import Direct from './direct.svelte';
	import Indirect from './indirect.svelte';
	import Redirect from './redirect.svelte';

	export let value = '123';
</script>

<Button href="/" color="light" class="inline-flex items-center">
	<HomeSolid class="me-2 h-4 w-4" />
	На головну
</Button>

<div class="min-h-screen bg-gray-900 p-8 text-white">
	<div class="mx-auto max-w-2xl space-y-8">
		<h1 class="mb-8 text-center text-3xl font-bold text-blue-400">Тестування компонентів</h1>

		<div class="rounded-lg border border-gray-700 bg-gray-800 p-6">
			<h2 class="mb-4 text-xl font-semibold text-green-400">Direct (works)</h2>
			<div class="space-y-3">
				<label for="direct-input" class="block text-sm font-medium text-gray-300">
					Прямий біндинг:
				</label>
				<Direct bind:value />
				<div class="mt-3 rounded-lg border border-gray-600 bg-gray-700 p-3">
					<span class="text-gray-300">Поточне значення: </span>
					<span class="rounded bg-gray-900 px-2 py-1 font-mono text-yellow-400">{value}</span>
				</div>
			</div>
		</div>

		<div class="rounded-lg border border-gray-700 bg-gray-800 p-6">
			<h2 class="mb-4 text-xl font-semibold text-orange-400">Indirect (broken)</h2>
			<div class="space-y-3">
				<label for="indirect-input" class="block text-sm font-medium text-gray-300">
					Непрямий біндинг через $$restProps:
				</label>
				<Indirect bind:value />
				<div class="mt-3 rounded-lg border border-gray-600 bg-gray-700 p-3">
					<span class="text-gray-300">Поточне значення: </span>
					<span class="rounded bg-gray-900 px-2 py-1 font-mono text-yellow-400">{value}</span>
				</div>
			</div>
		</div>

		<div class="rounded-lg border border-gray-700 bg-gray-800 p-6">
			<h2 class="mb-4 text-xl font-semibold text-purple-400">Redirect (works)</h2>
			<div class="space-y-3">
				<label for="redirect-input" class="block text-sm font-medium text-gray-300">
					Перенаправлений біндинг:
				</label>
				<Redirect bind:value />
				<div class="mt-3 rounded-lg border border-gray-600 bg-gray-700 p-3">
					<span class="text-gray-300">Поточне значення: </span>
					<span class="rounded bg-gray-900 px-2 py-1 font-mono text-yellow-400">{value}</span>
				</div>
			</div>
		</div>
	</div>
</div>
