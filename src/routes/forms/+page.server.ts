import { z } from 'zod';
import { fail, type Actions } from '@sveltejs/kit';

const schema = z.object({
	name: z.string().min(2, "Ім'я повинно містити мінімум 2 символи"),
	email: z.email('Введіть правильний email адрес').min(1, "Email є обов'язковим")
});

const schema2 = z.object({
	firstName: z.string().min(2, "Ім'я повинно містити мінімум 2 символи"),
	lastName: z.string().min(2, 'Прізвище повинно містити мінімум 2 символи'),
	employed: z.coerce.boolean(),
	jobTitle: z.string().min(2, 'Назва посади повинна містити мінімум 2 символи').optional()
});

export const actions: Actions = {
	create: async ({ request }) => {
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
	},
	create2: async ({ request }) => {
		const formData = await request.formData();
		const formDataObj = Object.fromEntries(formData.entries());

		const parsed = schema2.safeParse(formDataObj);

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
