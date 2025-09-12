<script>
	let a = $state(1);
	let b = $state(2);
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"
>
	<div class="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-2xl">
		<h1 class="mb-6 text-center text-2xl font-bold text-blue-400">Демо двостороннього біндингу</h1>

		<div class="space-y-6">
			<label class="flex flex-col gap-3">
				<span class="font-medium text-gray-300">Значення A</span>
				<input
					type="number"
					bind:value={a}
					min="0"
					max="10"
					class="rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white transition focus:border-blue-500 focus:outline-none"
				/>
				<input type="range" bind:value={a} min="0" max="10" class="w-full accent-blue-500" />
			</label>

			<label class="flex flex-col gap-3">
				<span class="font-medium text-gray-300">Значення B</span>
				<input
					type="number"
					bind:value={b}
					min="0"
					max="10"
					class="rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white transition focus:border-purple-500 focus:outline-none"
				/>
				<input type="range" bind:value={b} min="0" max="10" class="w-full accent-purple-500" />
			</label>
		</div>

		<p class="mt-8 text-center font-mono text-xl text-yellow-400">{a} + {b} = {a + b}</p>
	</div>
</div>
