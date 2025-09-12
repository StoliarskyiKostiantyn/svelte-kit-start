<script>
	let { children } = $props();
</script>

<nav
	class="mb-8 flex justify-center gap-6 rounded-b-xl bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 py-6 shadow-lg"
>
	<a
		href="/load-route/"
		class="rounded px-4 py-2 font-semibold text-white transition hover:bg-blue-700">home</a
	>
	<a
		href="/load-route/blog"
		class="rounded px-4 py-2 font-semibold text-white transition hover:bg-purple-700">blog</a
	>
</nav>

<div class="flex min-h-[60vh] items-center justify-center">
	<div class="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-2xl">
		{@render children()}
	</div>
</div>
