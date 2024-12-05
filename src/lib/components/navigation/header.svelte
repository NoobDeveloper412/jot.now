<script>
	import { onMount } from 'svelte';

	const menuItems = [
		{ name: 'Dashboard', href: '/dashboard', current: false },
		{ name: 'Youtube Notes', href: '/youtube-notes', current: false },
		{ name: 'Audio Notes PRO', href: '/audio-notes', current: false },
		{ name: 'Linguist Notes', href: '/linguist-notes', current: false },
		{ name: 'Learn Languages', href: '/learn', current: false },
		{ name: 'Note Market', href: '/marketplace', current: false },
		{ name: 'Pricing', href: '/pricing', current: false },
		{ name: 'Demo', href: '/demo', current: false }
	];

	onMount(() => {
		const currentPath = window.location.pathname;

		// Update the current state of the menu items
		menuItems.forEach((item) => {
			item.current = item.href === currentPath;
		});
	});
</script>

<nav class="border-theme-border border border-b-2 bg-white">
	<div class="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="flex items-center justify-center">
				<div class="flex shrink-0 items-center">
					<img class="h-8 w-auto" src="/images/Logo.svg" alt="logo" />
				</div>
			</div>
			<div class="flex items-center justify-center">
				<div class="flex space-x-4">
					{#each menuItems as item}
						<a
							href={item.href}
							class={`px-3 py-2 text-sm font-medium leading-5 ${
								item.current
									? 'border-primary-500 decoration-primary-500 underline decoration-2 underline-offset-[25px]'
									: 'border-primary-500 decoration-primary-500 text-gray-600 hover:underline decoration-2 underline-offset-[25px] hover:text-black'
							}`}
							aria-current={item.current ? 'page' : undefined}
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>
			<div class="flex items-center pr-2">
				<button>
					<img src="/icons/Bell.svg" alt="bell_icon" />
				</button>
				<button
					type="button"
					class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					id="user-menu-button"
					aria-expanded="false"
					aria-haspopup="true"
				>
					<img
						class="size-8 rounded-full"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</button>

				<button> Sign in </button>
			</div>
		</div>
	</div>
</nav>
