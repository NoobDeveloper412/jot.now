import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const authToken = cookies.get('authToken');
	if (authToken) {
		// throw redirect(302, '/dashboard');
	} else {
		return { userAuthenticated: false };
	}
}
