
<script>
	import Direct from './direct.svelte';
	import Indirect from './indirect.svelte';
	import Redirect from './redirect.svelte';

	export let value = '123';
</script>

<div class="min-h-screen bg-gray-900 text-white p-8">
	<div class="max-w-2xl mx-auto space-y-8">
		<h1 class="text-3xl font-bold text-center mb-8 text-blue-400">Тестування компонентів</h1>

		<div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
			<h2 class="text-xl font-semibold mb-4 text-green-400">Direct (works)</h2>
			<Direct bind:value />
			<div class="mt-3 text-gray-300">
				Поточне значення: <span class="text-yellow-400 font-mono">{value}</span>
			</div>
		</div>

		<div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
			<h2 class="text-xl font-semibold mb-4 text-orange-400">Indirect (broken)</h2>
			<Indirect bind:value />
			<div class="mt-3 text-gray-300">
				Поточне значення: <span class="text-yellow-400 font-mono">{value}</span>
			</div>
		</div>

		<div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
			<h2 class="text-xl font-semibold mb-4 text-purple-400">Redirect (works)</h2>
			<Redirect bind:value />
			<div class="mt-3 text-gray-300">
				Поточне значення: <span class="text-yellow-400 font-mono">{value}</span>
			</div>
		</div>
	</div>
</div>