import type { PageServerLoad } from './$types';
import { request } from '@/network/api';

export const load: PageServerLoad = async ({ locals }) => {
	// Get userId from the authentication store or locals
	const userId = locals.user?.id;

	if (!userId) {
		return { folders: [] }; 
	}

	try {
		// Call backend API to fetch folders
		const response = await request('getFolders', {}, { userId });
		// Return folders fetched from the backend
		return {
			folders: response.folders || []
		};
	} catch (error) {
		console.error('Error fetching folders on server:', error);

		// Return empty array in case of error
		return { folders: [] };
	}
};
