<script lang="ts">
	let { data } = $props();
</script>

<div class="mt-8 w-full rounded-xl bg-gray-800 p-8 shadow-2xl">
	<h1 class="mb-6 text-center text-3xl font-bold text-blue-400">{data?.post?.title}</h1>
	<div class="prose prose-invert prose-lg text-gray-100">{@html data?.post?.content}</div>
</div>
