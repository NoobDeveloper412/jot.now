<script>
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import MainSidebar from '@/components/sidebars/MainSidebar.svelte';
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="max-w-[270px] bg-gray">
		<MainSidebar />
	</Sidebar.Provider>

	<div class="flex flex-1 flex-col bg-[#F8FAFC]">
		<main class="flex h-full flex-col items-center justify-center">
			<h1 class="pb-10 text-5xl">
				Welcome to
				<img class="h-20 w-auto" src="/images/Logo.svg" alt="logo" />
			</h1>

			<div class="flex items-center justify-center gap-4">
				<Button class="text-white" onclick={() => goto('/dashboard/yt-jots')}>Youtube Notes</Button>
				<Button class="text-white" onclick={() => goto('/dashboard/dictionary')}
					>Create a Dictionary</Button
				>
			</div>
		</main>
	</div>
</main>
