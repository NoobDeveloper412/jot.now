<script lang="ts">
	import ProgressCircularIcon from './ProgressCircularIcon.svelte';
	import NestedCollapsible from './NestedCollapsible.svelte';

	export let items: any[] = []; // Items to render
    console.log(items)
</script>

<ul class="space-y-1">
	{#each items as item}
		<li>
			{#if item.type === 'folder'}
				<!-- Render Folder -->
				<NestedCollapsible
					labelText={item.label}
					items={item.items}
					type="folder"
					percentage={item.percentage || 0}
					showProgress={item.showProgress || false}
				/>
			{:else if item.type === 'note'}
				<!-- Render Note -->
				<div
					class="note-item flex cursor-pointer items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
				>
					<span>{item.label}</span>
					{#if item.percentage}
						<ProgressCircularIcon percentage={item.percentage} size={20} strokeWidth={3} />
					{/if}
				</div>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.note-item {
		margin-bottom: 0.5rem;
	}
</style>
