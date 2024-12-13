<script>
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import MainSidebar from '@/components/sidebars/MainSidebar.svelte';
	let { children } = $props();
</script>

<main class="flex h-screen">
	<Sidebar.Provider class="max-w-[270px] ">
		<MainSidebar />
	</Sidebar.Provider>

	<div>
		<Sidebar.Trigger />
		{@render children?.()}
	</div>
</main>
