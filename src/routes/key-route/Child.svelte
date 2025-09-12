<script>
	export let keyValue;
	let renderTime = new Date().toLocaleTimeString();
</script>

<div class="child">
	<h2>Child компонент</h2>
	<p>Key: <span class="key">{keyValue}</span></p>
	<p>Render time: <span class="time">{renderTime}</span></p>
</div>

<style>
	.child {
		background: #fff;
		color: #232946;
		padding: 2em 3em;
		border-radius: 12px;
		box-shadow: 0 4px 16px rgba(95, 108, 175, 0.15);
		text-align: center;
	}
	.key {
		font-weight: bold;
		color: #1a56db;
	}
	.time {
		font-family: monospace;
		color: #7e3af2;
	}
</style>
