<script>
	let count = 0;
</script>

<p>{count}</p>
<button on:click={() => count++}>Збільшити</button>

<style>
	button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		background-color: #3b82f6;
		color: white;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
	}
	button:hover {
		background-color: #2563eb;
	}
	p {
		font-size: 1.5rem;
		font-weight: bold;
		color: aqua;
	}
</style>
