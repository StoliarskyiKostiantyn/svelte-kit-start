import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	name: z.string().min(2, "Ім'я повинно містити мінімум 2 символи"),
	email: z.string().min(1, "Email є обов'язковим").email('Введіть правильний email адрес')
});

export const actions = {
	create: async ({ request }: { request: Request }) => {
		const formData = await request.formData();

		const formDataObj = Object.fromEntries(formData.entries());

		const parsed = schema.safeParse(formDataObj);

		if (!parsed.success) {
			console.error('Validation errors:', parsed.error.format());
			return fail(400, {
				errors: parsed.error.format(),
				data: formDataObj
			});
		}

		console.log('Valid form data:', parsed.data);

		return {
			success: true,
			data: parsed.data,
			message: 'Дані успішно збережено!'
		};
	}
};
