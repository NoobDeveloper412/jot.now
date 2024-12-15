import { jwtVerify } from 'jose';

export async function handle({ event, resolve }) {
	const authToken = event.cookies.get('authToken');

	if (authToken) {
		try {
			// Secret key encoded
			const secret = new TextEncoder().encode('asdadshfkjh232jh39*@9');

			// Verify the token
			const { payload } = await jwtVerify(authToken, secret);

			// Attach user data to locals
			event.locals.user = {
				id: payload.id,
				email: payload.email
			};
		} catch (err) {
			console.error('Failed to verify JWT:', err);
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return await resolve(event);
}
