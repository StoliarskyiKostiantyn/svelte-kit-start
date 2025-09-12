<script>
	import Child from './Child.svelte';

	let id = $state(1);

	function change() {
		id = Math.random();
	}
</script>

<div class="container">
	<Child keyValue={id} />

	<button class="btn" onclick={change}>Змінити ключ</button>
</div>

<style>
	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 320px;
		background: linear-gradient(135deg, #232946 0%, #5f6caf 100%);
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(34, 41, 70, 0.18);
		padding: 2em;
	}
	.btn {
		margin-top: 2em;
		padding: 0.75em 2em;
		font-size: 1.2em;
		font-weight: bold;
		color: #fff;
		background: #1a56db;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.2s;
		box-shadow: 0 2px 8px rgba(34, 41, 70, 0.08);
	}
	.btn:hover {
		background: #7e3af2;
	}
</style>
