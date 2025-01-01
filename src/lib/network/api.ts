import { urlMap } from './endpoints';

// Utility to replace dynamic parameters in the URL
function replaceDynamicParams(url: string, params: Record<string, string>): string {
	return Object.keys(params).reduce(
		(updatedUrl, key) => updatedUrl.replace(`:${key}`, params[key]),
		url
	);
}
export async function request<T>(
	endpointKey: string,
	data: object | FormData = {},
	dynamicParams: Record<string, string> = {},
	isFileUpload: boolean = false
): Promise<T> {
	try {
		const endpoint = urlMap[endpointKey];
		if (!endpoint) throw new Error(`Endpoint ${endpointKey} not found`);

		const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
		const url = `${API_BASE_URL}${replaceDynamicParams(endpoint.url, dynamicParams)}`;

		const options: RequestInit = {
			method: endpoint.method,
			credentials: 'include'
		};

		if (isFileUpload && data instanceof FormData) {
			// Handle file uploads
			options.body = data;
		} else {
			// Handle JSON payloads
			options.headers = { 'Content-Type': 'application/json' };
			options.body = endpoint.method !== 'GET' ? JSON.stringify(data) : undefined;
		}

		const response = await fetch(url, options);

		// Parse the response body
		const responseBody = await response.json();

		if (!responseBody) {
			throw new Error(responseBody.message || 'Something went wrong');
		}

		return responseBody as T;
	} catch (error) {
		console.error(`Request failed for ${endpointKey}:`, error);
		throw error;
	}
}
