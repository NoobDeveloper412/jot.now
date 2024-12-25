<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { formatTime, navigateTo } from '@/utils';
	import Input from '../ui/input/input.svelte';
	import Icon from '@iconify/svelte';

	export let jots = [];
	export let createItem;

	let newJotName = '';

	let searchQuery = '';

	$: filteredJots = jots?.filter((jot) =>
		jot.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<Sidebar.Content class="border border-2 border-l-[#E4E7EC] bg-white px-4 py-2">
	<Sidebar.Group>
		<Sidebar.GroupLabel class="flex items-center justify-center">
			<img class="h-[20px] w-[85px] md:h-8 md:w-[120px]" src="/images/Logo.svg" alt="logo" />
		</Sidebar.GroupLabel>
		<hr class="my-2 text-[#E4E7EC]" />
		<Sidebar.GroupContent>
			<Sidebar.Menu>
				{#if jots.length > 0}
					<div class="relative">
						<Input
							id="addJot"
							placeholder="Add Jot"
							bind:value={newJotName}
							class="theme-input pr-10"
						/>
						<Icon
							icon="proicons:add-circular"
							onclick={() => createItem(newJotName, 'folder', '')}
							class="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-[#97A1AF]"
						/>
					</div>
				{/if}

				<hr class="my-1" />

				<!-- Search Bar -->
				<div class="relative">
					<Input
						id="search"
						placeholder="Search..."
						bind:value={searchQuery}
						class="theme-input pr-10"
					/>
					<Icon
						icon="mdi:search"
						class="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-[#97A1AF]"
					/>
				</div>

				<!-- Render jots if passed -->
				{#if jots.length > 0}
					<ul class="space-y-2">
						{#each filteredJots as jot}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<li
								class="flex cursor-pointer items-center justify-between py-2 hover:bg-[#F9FAFB]"
								on:click={() => navigateTo('jots', jot._id)}
							>
								<div class="flex items-center space-x-2 px-2">
									<Icon icon="fluent:note-16-regular" class="h-5 w-5 text-[#97A1AF]" />
									<span class="text-sm font-[400] text-[#344051]">{jot.title}</span>
								</div>
								<span class="flex items-center">
									<span class="text-xs p-1 px-2 rounded-lg font-[400] text-[#344051] bg-[#F2F4F7]">{formatTime(jot.timestamp)}</span>
								</span>
							</li>
						{/each}
					</ul>
				{/if}
			</Sidebar.Menu>
		</Sidebar.GroupContent>
	</Sidebar.Group>
</Sidebar.Content>
