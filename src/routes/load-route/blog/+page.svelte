<script lang="ts">
	let { data } = $props();
</script>

<h1 class="mb-8 text-center text-3xl font-bold text-purple-400">Blog</h1>

<ul class="mx-auto max-w-md space-y-4">
	{#each data.summaries as { slug, title }}
		<li>
			<a
				href={`/load-route/blog/${slug}`}
				class="block rounded-lg bg-gray-800 px-6 py-4 text-lg font-semibold text-blue-300 shadow transition hover:bg-blue-900 hover:text-white"
			>
				{title}
			</a>
		</li>
	{/each}
</ul>
