<script lang="ts">
	import Input from '@/components/ui/input/input.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { request } from '@/network/api';
	import { authToken, userData } from '@/stores/authStore';
	import { goto } from '$app/navigation';

	let firstName = 'Muhammad';
	let lastName = 'Zuhayr';
	let email = 'm@gmail.com';
	let password = '123456789';
	let confirmPassword = '123456789';
	let errorMessage = '';
	let successMessage = '';

	async function handleRegister() {
		errorMessage = '';
		successMessage = '';

		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match!';
			return;
		}

		try {
			const response = await request('register', { firstName, lastName, email, password });

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Registration failed.');
			}

			// Parse the response
			const { token, user } = await response.json();

			// Save token and user to stores/localStorage
			authToken.set(token);
			userData.set(user);

			// Optional: Redirect to dashboard or home
			successMessage = 'Registration successful! Redirecting...';
			goto('/dashboard');
		} catch (error) {
			if (error.message.includes('User already exists')) {
				errorMessage = 'This email is already registered. Please log in.';
			} else {
				errorMessage = error.message || 'Registration failed. Please try again.';
			}
		}
	}
</script>

<div class="mx-auto mt-20 max-w-md rounded-lg border p-8 shadow">
	<h2 class="mb-4 text-center text-2xl font-semibold">Create an Account</h2>

	{#if errorMessage}
		<div class="mb-4 text-sm text-red-500">{errorMessage}</div>
	{/if}

	{#if successMessage}
		<div class="mb-4 text-sm text-green-500">{successMessage}</div>
	{/if}

	<form class="space-y-4" on:submit|preventDefault={handleRegister}>
		<Input bind:value={firstName} type="text" placeholder="First Name" required />
		<Input bind:value={lastName} type="text" placeholder="Last Name" required />
		<Input bind:value={email} type="email" placeholder="Email Address" required />
		<Input bind:value={password} type="password" placeholder="Password" required />
		<Input bind:value={confirmPassword} type="password" placeholder="Confirm Password" required />

		<Button class="w-full bg-blue-600 py-2 text-white" type="submit">Register</Button>
	</form>

	<p class="mt-4 text-center text-sm">
		Already have an account? <a href="/login" class="text-blue-600 hover:underline">Log in</a>
	</p>
</div>
