import type { PageServerLoad } from './$types';
import { request } from '@/network/api';

export const load: PageServerLoad = async ({ locals, params }) => {
	const userId = locals.user?.id;
	const folderId = params.id;

	console.log(userId, folderId);
	if (!userId || !folderId) {
		return { folder: null };
	}

	try {
		const response = await request('getFolderById', { folderId }, { userId });

		console.log(response, '+===================');
		return {
			folder: response.folder
		};
	} catch (error) {
		console.error('Error fetching folder on server:', error);

		return { folder: null, folderId };
	}
};
