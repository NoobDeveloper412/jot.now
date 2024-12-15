import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialize stores with localStorage data only if in browser
export const authToken = writable(browser ? localStorage.getItem('authToken') || null : null);
export const userData = writable(browser ? JSON.parse(localStorage.getItem('userData') || 'null') : null);

// Update localStorage whenever the store changes, only in browser
authToken.subscribe((value) => {
	if (browser) {
		if (value) localStorage.setItem('authToken', value);
		else localStorage.removeItem('authToken');
	}
});

userData.subscribe((value) => {
	if (browser) {
		if (value) localStorage.setItem('userData', JSON.stringify(value));
		else localStorage.removeItem('userData');
	}
});
