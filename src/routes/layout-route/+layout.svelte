<script>
	let { children } = $props();
	import { Button } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';
</script>

<Button href="/" color="light" class="inline-flex items-center">
	<HomeSolid class="me-2 h-4 w-4" />
	На головну
</Button>

<nav class="nav">
	<a href="/layout-route">home</a>
	<a href="/layout-route/a">a</a>
	<a href="/layout-route/a/b">a/b</a>
	<a href="/layout-route/a/b/c">a/b/c</a>
</nav>

<div class="layout" data-name="root">
	{@render children()}
</div>

<style>
	:global(body) {
		background: linear-gradient(135deg, #232946 0%, #5f6caf 100%);
		min-height: 100vh;
	}

	.nav {
		display: flex;
		gap: 1.5em;
		justify-content: center;
		margin-top: 2em;
		margin-bottom: 1em;
	}

	.nav a {
		color: #fff;
		background: #232946;
		padding: 0.5em 1.2em;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 500;
		transition:
			background 0.2s,
			color 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 2px 8px rgba(34, 41, 70, 0.08);
		border: 1px solid #3d497c;
	}

	.nav a:hover,
	.nav a:focus {
		background: #5f6caf;
		color: #ffe;
		box-shadow: 0 4px 16px rgba(95, 108, 175, 0.15);
	}

	:global(.layout) {
		position: relative;
		border: 1px solid #3d497c;
		padding: 2em;
		margin: 2em auto 0 auto;
		border-radius: 12px;
		max-width: 700px;
		background: rgba(44, 51, 89, 0.95);
		box-shadow: 0 8px 32px rgba(34, 41, 70, 0.18);
	}

	:global(.layout::before) {
		position: absolute;
		content: attr(data-name) ' layout';
		left: 2em;
		top: -1.5em;
		background: #232946;
		color: #e6e6e6;
		padding: 0.5em 1em;
		line-height: 1;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(34, 41, 70, 0.08);
		letter-spacing: 0.5px;
	}

	@media (prefers-color-scheme: dark) {
		:global(.layout::before) {
			background: #232946;
			color: #e6e6e6;
		}
	}
</style>
