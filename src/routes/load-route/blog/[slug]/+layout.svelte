<script>
	let { data, children } = $props();
</script>

<div class="mx-auto mt-8 flex max-w-5xl flex-col items-start gap-8 md:flex-row">
	<main class="flex-1">
		{@render children()}
	</main>

	<aside
		class="ml--2 mt-12 flex h-fit w-full flex-col items-center rounded-2xl bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 p-7 shadow-2xl md:w-80"
	>
		<h2 class="mb-6 text-center text-2xl font-extrabold tracking-wide text-blue-200">Ще пости</h2>
		<ul class="w-full space-y-3">
			{#each data.summaries as { slug, title }}
				<li>
					<a
						href={`/blog/${slug}`}
						class="block w-full rounded-xl bg-gray-800 px-5 py-3 text-lg font-semibold text-blue-100 shadow transition-all duration-200 hover:bg-blue-700 hover:text-white"
					>
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>
