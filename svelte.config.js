import autoAdapter from '@sveltejs/adapter-auto';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: process.env.NODE_ENV === 'production' ? vercelAdapter() : autoAdapter(),
		alias: {
			"@/*": "./src/lib/*",
		},
	}
};

export default config;
