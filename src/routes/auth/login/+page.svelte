<script lang="ts">
	import Input from '@/components/ui/input/input.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { request } from '@/network/api';
	import { authToken, userData } from '@/stores/authStore';
	import { goto } from '$app/navigation';

	let email = 'm@gmail.com';
	let password = '123456789';
	let errorMessage = '';
	let successMessage = '';

	async function handleLogin() {
		errorMessage = '';
		successMessage = '';

		try {
			const response = await request('login', { email, password });

			// Assuming the response contains a token and user object
			const { token, user } = response;

			console.log(token, user)

			// Save token and user to stores/localStorage
			authToken.set(token);
			userData.set(user);

			// Redirect to dashboard or home
			successMessage = 'Login successful! Redirecting...';
			goto('/dashboard');
		} catch (error) {
			errorMessage = error.message || 'Login failed. Please try again.';
		}
	}
</script>

<div class="mx-auto mt-20 max-w-md rounded-lg border p-8 shadow">
	<h2 class="mb-4 text-center text-2xl font-semibold">Log In</h2>

	{#if errorMessage}
		<div class="mb-4 text-sm text-red-500">{errorMessage}</div>
	{/if}

	{#if successMessage}
		<div class="mb-4 text-sm text-green-500">{successMessage}</div>
	{/if}

	<form class="space-y-4" on:submit|preventDefault={handleLogin}>
		<Input bind:value={email} type="email" placeholder="Email Address" required />
		<Input bind:value={password} type="password" placeholder="Password" required />

		<Button class="w-full bg-blue-600 py-2 text-white" type="submit">Log In</Button>
	</form>

	<p class="mt-4 text-center text-sm">
		Don't have an account? <a href="/register" class="text-blue-600 hover:underline">Register</a>
	</p>
</div>
