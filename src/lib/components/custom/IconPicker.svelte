<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

	export let selectedIcon = 'mdi:home';

	const icons = [
		'mdi:home',
		'mdi:account',
		'mdi:email',
		'mdi:phone',
		'mdi:settings',
		'mdi:star',
		'mdi:heart',
		'mdi:calendar',
		'mdi:camera',
		'mdi:cart',
		'mdi:chat',
		'mdi:check',
		'mdi:close',
		'mdi:delete',
		'mdi:download',
		'mdi:upload',
		'mdi:lock',
		'mdi:unlock',
		'mdi:map',
		'mdi:music'
	];

	function selectIcon(icon: string) {
		selectedIcon = icon;
	}
</script>

<Popover>
	<PopoverTrigger>
		<button class="flex items-center justify-center pt-1 rounded">
			<Icon icon={selectedIcon} class="h-6 w-6" />
		</button>
	</PopoverTrigger>
	<PopoverContent class="rounded border bg-white p-4 shadow-lg">
		<div class="grid grid-cols-5 gap-4">
			{#each icons as icon}
				<button
					type="button"
					class="flex items-center justify-center rounded border p-2 hover:bg-gray-100"
					on:click={() => selectIcon(icon)}
				>
					<Icon {icon} class="h-6 w-6" />
				</button>
			{/each}
		</div>
	</PopoverContent>
</Popover>
