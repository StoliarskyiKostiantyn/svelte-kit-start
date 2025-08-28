export interface ActionData {
	success?: boolean;
	message?: string;
	data?: {
		name: string;
		email: string;
	};
	errors?: {
		name?: { _errors: string[] };
		email?: { _errors: string[] };
		_errors?: string[];
	};
}
