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
	data: object = {},
	dynamicParams: Record<string, string> = {}
): Promise<T> {
	try {
		const endpoint = urlMap[endpointKey];
		if (!endpoint) throw new Error(`Endpoint ${endpointKey} not found`);

		const API_BASE_URL = 'http://localhost:3000';
		const url = `${API_BASE_URL}${replaceDynamicParams(endpoint.url, dynamicParams)}`;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json'
		};

		const options: RequestInit = {
			method: endpoint.method,
			headers,
			body: endpoint.method !== 'GET' ? JSON.stringify(data) : undefined
		};

		const response = await fetch(url, options);

		// Log the raw response for debugging
		// console.log(`Raw Response:`, response);

		const responseBody = await response.json();

		// Log the parsed response for debugging
		// console.log(`Parsed Response Body:`, responseBody);

		// Check for non-OK responses in the body
		if (responseBody.status !== 'ok') {
			throw new Error(responseBody.message || 'Something went wrong');
		}

		// Return the parsed response
		return responseBody as T;
	} catch (error) {
		console.error(`Request failed for ${endpointKey}:`, error);
		throw error;
	}
}
