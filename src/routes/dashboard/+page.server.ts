import type { PageServerLoad } from './$types';

const API_KEY = '4a66ba1946775e09fb3a28a1dbb47183';

interface DailyData {
	[key: string]: {
		day: number[];
		night: number[];
		date: string;
	};
}

interface WeatherItem {
	dt: number;
	main: {
		temp: number;
	};
}

interface CurrentWeatherData {
	main: {
		temp: number;
	};
	weather: Array<{
		description: string;
	}>;
	name: string;
	sys: {
		country: string;
	};
}

interface ForecastData {
	list: WeatherItem[];
}

async function fetchWeatherData(lat: number, lon: number) {
	try {
		const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
		const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

		const [currentRes, forecastRes] = await Promise.all([
			fetch(currentWeatherUrl),
			fetch(forecastUrl)
		]);

		if (!currentRes.ok || !forecastRes.ok) {
			throw new Error(`API Error: ${currentRes.status} / ${forecastRes.status}`);
		}

		const currentData: CurrentWeatherData = await currentRes.json();
		const forecastData: ForecastData = await forecastRes.json();

		// Обробляємо прогноз на 5 днів
		const dailyData: DailyData = {};
		forecastData.list.forEach((item: WeatherItem) => {
			const date = new Date(item.dt * 1000);
			const dateKey = date.toDateString();
			const hour = date.getHours();

			if (!dailyData[dateKey]) {
				dailyData[dateKey] = { day: [], night: [], date: dateKey };
			}

			if (hour >= 6 && hour <= 18) {
				dailyData[dateKey].day.push(item.main.temp);
			} else {
				dailyData[dateKey].night.push(item.main.temp);
			}
		});

		// Створюємо масив для графіка
		const processedDaily = Object.values(dailyData)
			.slice(0, 5)
			.map((day) => ({
				date: day.date,
				dayTemp:
					day.day.length > 0
						? Math.round(day.day.reduce((a: number, b: number) => a + b) / day.day.length)
						: Math.round(currentData.main.temp),
				nightTemp:
					day.night.length > 0
						? Math.round(day.night.reduce((a: number, b: number) => a + b) / day.night.length)
						: Math.round(currentData.main.temp) - 5
			}));

		const chartData = {
			labels: processedDaily.map((day) =>
				new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })
			),
			dayTemps: processedDaily.map((day) => day.dayTemp),
			nightTemps: processedDaily.map((day) => day.nightTemp)
		};

		return {
			current: {
				temp: Math.round(currentData.main.temp),
				condition: currentData.weather[0].description,
				location: `${currentData.name}, ${currentData.sys.country}`,
				city: currentData.name
			},
			coordinates: { lat, lon },
			chart: chartData,
			error: null
		};
	} catch (error) {
		console.error('Помилка при отриманні погоди:', error);
		return {
			current: null,
			coordinates: { lat, lon },
			chart: null,
			error: error instanceof Error ? error.message : 'Невідома помилка'
		};
	}
}

export const load: PageServerLoad = async ({ url }) => {
	// Отримуємо координати з URL параметрів або використовуємо Харків за замовчуванням
	const latParam = url.searchParams.get('lat');
	const lonParam = url.searchParams.get('lon');

	const lat = latParam ? parseFloat(latParam) || 49.9935 : 49.9935;
	const lon = lonParam ? parseFloat(lonParam) || 36.2304 : 36.2304;

	const weatherData = await fetchWeatherData(lat, lon);

	return weatherData;
};
