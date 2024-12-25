import type { PageServerLoad } from './$types';
import { request } from '@/network/api';

export const load: PageServerLoad = async ({ locals, params }) => {
	const folderId = params.id;
	const noteId = params.noteId;

	return { folderId, noteId };
};
