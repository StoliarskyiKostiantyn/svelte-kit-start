<script lang="js">
	import { Button } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	gsap.registerEffect({
		name: 'fade',
		defaults: { duration: 0.7 },
		effect: (targets, config) => {
			return gsap.to(targets, {
				duration: config.duration,
				opacity: 0.4,
				scale: 1.12,
				boxShadow: '0 0 24px #fff'
			});
		}
	});

	gsap.registerEffect({
		name: 'resetFade',
		defaults: { duration: 0.5 },
		effect: (targets, config) => {
			return gsap.to(targets, {
				duration: config.duration,
				opacity: 1,
				scale: 1,
				boxShadow: '0 0 0 #fff'
			});
		}
	});
	function onMouseEnterEvent() {
		gsap.effects.fade(this);
	}
	function onMouseLeaveEvent() {
		gsap.effects.resetFade(this);
	}
</script>

<Button href="/" color="light" class="inline-flex items-center">
	<HomeSolid class="me-2 h-4 w-4" />
	На головну
</Button>

<link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet" type="text/css" />
<div id="demo">
	<h2>GSAP Effects Demo</h2>
	<div class="boxes">
		<div
			class="box green"
			on:mouseenter={onMouseEnterEvent}
			on:mouseleave={onMouseLeaveEvent}
			role="application"
		>
			green
		</div>
		<div
			class="box orange"
			on:mouseenter={onMouseEnterEvent}
			on:mouseleave={onMouseLeaveEvent}
			role="application"
		>
			orange
		</div>
		<div
			class="box green"
			on:mouseenter={onMouseEnterEvent}
			on:mouseleave={onMouseLeaveEvent}
			role="application"
		>
			green
		</div>
	</div>
</div>

<style>
	:global(#demo) {
		background: linear-gradient(135deg, #232526 0%, #414345 100%);
		font-family: 'Signika', sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		margin: 0;
	}

	#demo {
		padding: 2rem 2.5rem;
		background: rgba(30, 30, 40, 0.95);
		border-radius: 18px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	h2 {
		font-size: 2.2rem;
		font-weight: 700;
		color: #fff;
		text-shadow: 0 2px 8px #0006;
		margin-bottom: 1.2rem;
		letter-spacing: 1px;
	}

	.boxes {
		display: flex;
		flex-wrap: wrap;
		gap: 1.2rem;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 1rem;
	}

	.box {
		width: 70px;
		height: 70px;
		border-radius: 16px;
		display: inline-block;
		box-shadow: 0 2px 12px #0004;
		cursor: pointer;
		border: 2px solid #fff2;
		font-size: 1.1rem;
		color: #fff;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
	}
	.green {
		background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
	}

	.orange {
		background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
	}
</style>
