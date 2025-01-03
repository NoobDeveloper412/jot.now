<script lang="ts">
	import { onMount } from 'svelte';

	export let percentage: number = 0;
	export let size: number = 120;
	export let strokeWidth: number = 10;
	export let color: string = '#64748B';

	let normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
	let circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
	let offset = circumference;

	onMount(() => {
		requestAnimationFrame(() => {
			offset = circumference - (normalizedPercentage / 100) * circumference;
		});
	});
</script>

<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} class="transform">
	<circle
		cx={size / 2}
		cy={size / 2}
		r={size / 2 - strokeWidth / 2}
		stroke="#E2E8F0"
		stroke-width={strokeWidth}
		fill="none"
	/>
	<circle
		cx={size / 2}
		cy={size / 2}
		r={size / 2 - strokeWidth / 2}
		stroke={color}
		stroke-width={strokeWidth}
		fill="none"
		stroke-dasharray={circumference}
		stroke-dashoffset={offset}
		stroke-linecap="round"
		
		class="transition-all duration-500 ease-out"
	/>
	<text
		x="50%"
		y="50%"
		text-anchor="middle"
		dy=".3em"
		font-size={`${size * 0.3}px`}
		class="font-semibold"
		fill={color}
	>
		{normalizedPercentage}
	</text>
</svg>
