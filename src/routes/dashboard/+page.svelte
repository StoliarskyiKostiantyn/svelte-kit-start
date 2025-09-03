<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { Button, Popover } from 'flowbite-svelte';
	import { InfoCircleSolid, FileLinesSolid, HomeSolid } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();
	let chartKey = $state(0);

	let options: ApexOptions = $state({
		chart: {
			height: '600px',
			type: 'line',
			fontFamily: 'Inter, sans-serif',
			dropShadow: { enabled: false },
			toolbar: { show: false }
		},
		tooltip: { enabled: true },
		dataLabels: { enabled: false },
		stroke: { width: 4, curve: 'smooth' },
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: { left: 2, right: 2, top: -26 }
		},
		series: [],
		xaxis: {
			categories: [],
			labels: {
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			},
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: { show: false },
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						height: '400px'
					}
				}
			}
		]
	});

	// Функція для отримання геолокації та оновлення даних
	async function updateLocation() {
		if (!navigator.geolocation) {
			console.error('Геолокація не підтримується браузером');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				const lat = pos.coords.latitude;
				const lon = pos.coords.longitude;
				// Перенаправляємо на ту ж сторінку з новими координатами
				goto(`/dashboard?lat=${lat}&lon=${lon}`);
			},
			(error) => {
				console.error('Помилка геолокації:', error);
				// У разі помилки використовуємо Харків
				goto('/dashboard?lat=49.9935&lon=36.2304');
			}
		);
	}

	// Оновлюємо опції графіка коли дані змінюються
	$effect(() => {
		if (data.chart) {
			// Додаємо невелику затримку для запобігання помилці ApexCharts
			setTimeout(() => {
				chartKey = Date.now();
			}, 100);
		}
	});

	// Автоматично отримуємо геолокацію при першому завантаженні
	onMount(() => {
		// Якщо координати не передані в URL, спробуємо отримати геолокацію
		const urlParams = new URLSearchParams(window.location.search);
		if (!urlParams.has('lat') && !urlParams.has('lon')) {
			updateLocation();
		}
	});
</script>

<div class="w-full p-4 md:p-6">
	<!-- Заголовок з кнопками -->
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white">Дашборд погоди</h1>
		<div class="flex gap-2">
			<Button onclick={updateLocation} color="blue" size="sm">📍 Моя локація</Button>
			<Button href="/" color="light" class="inline-flex items-center">
				<HomeSolid class="me-2 h-4 w-4" />
				На головну
			</Button>
		</div>
	</div>

	{#if data.error}
		<div class="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
			<strong>Помилка:</strong>
			{data.error}
			<br />
			<button onclick={updateLocation} class="mt-2 text-blue-600 underline">
				Спробувати знову
			</button>
		</div>
	{/if}

	<div class="mb-5 flex justify-between">
		<div class="grid grid-cols-2 gap-4">
			<div>
				<h5
					class="mb-2 inline-flex items-center leading-none font-normal text-gray-500 dark:text-gray-400"
				>
					Temperature
					<InfoCircleSolid
						id="temp-info"
						class="ms-1 h-3 w-3 cursor-pointer text-gray-400 hover:text-gray-900 dark:hover:text-white"
					/>
					<Popover
						triggeredBy="#temp-info"
						class="z-10 w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 shadow-xs dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
					>
						<div class="space-y-2 p-3">
							<h3 class="font-semibold text-gray-900 dark:text-white">
								7-Day Temperature Forecast
							</h3>
							<p>
								This chart shows daytime and nighttime temperatures based on your location. Powered
								by OpenWeatherMap.
							</p>
						</div>
					</Popover>
				</h5>
				<p class="text-2xl leading-none font-bold text-gray-900 dark:text-white">
					{data.current?.temp !== undefined ? `${data.current.temp}°C` : 'Loading...'}
				</p>
			</div>
			<div>
				<h5 class="mb-2 leading-none font-normal text-gray-500 dark:text-gray-400">Condition</h5>
				<p class="text-2xl leading-none font-bold text-gray-900 capitalize dark:text-white">
					{data.current?.condition || 'Loading...'}
				</p>
			</div>
			<div>
				<h5 class="mb-2 leading-none font-normal text-gray-500 dark:text-gray-400">
					Current location
				</h5>
				<p class="text-2xl leading-none font-bold text-gray-900 capitalize dark:text-white">
					{data.current?.location || 'Loading...'}
				</p>
			</div>
		</div>
	</div>

	<!-- Контейнер для графіка -->
	{#if data.chart}
		<div class="min-h-[600px] w-full md:min-h-[600px]">
			{#key chartKey}
				<Chart
					options={{
						...options,
						xaxis: { ...options.xaxis, categories: data.chart.labels },
						series: [
							{ name: 'Day', data: data.chart.dayTemps, color: '#1A56DB' },
							{ name: 'Night', data: data.chart.nightTemps, color: '#7E3AF2' }
						]
					}}
				/>
			{/key}
		</div>
	{:else}
		<div
			class="flex min-h-[600px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
		>
			<p class="text-gray-500 dark:text-gray-400">Завантаження графіка...</p>
		</div>
	{/if}

	<div class="mt-2.5 grid grid-cols-1 border-t border-gray-200 dark:border-gray-700">
		<div class="pt-5">
			<Button
				href={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${data.coordinates.lat}&lon=${data.coordinates.lon}&zoom=10`}
				target="_blank"
				class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white"
			>
				<FileLinesSolid class="me-2 h-3.5 w-3.5 text-white" />
				Переглянути {data.current?.city || 'локацію'} на OpenWeather
			</Button>
		</div>
	</div>
</div>

<style>
	:global(.apexcharts-tooltip) {
		font-family: Inter, sans-serif;
	}

	/* Забезпечуємо повну ширину для графіка */
	:global(.apexcharts-canvas) {
		width: 100% !important;
	}

	/* Responsive стилі для графіка */
	@media (max-width: 768px) {
		:global(.apexcharts-canvas svg) {
			height: 400px !important;
		}
	}

	@media (min-width: 769px) {
		:global(.apexcharts-canvas svg) {
			height: 600px !important;
		}
	}
</style>
