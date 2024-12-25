<script lang="ts">
	export let text: string;
	export let isSelected: boolean = false;
	export let onClick: (text: string) => void;
	export let theme: string = 'gray'; // Default theme
	export let classes: string = '';

	const themeMap = {
		red: { bg: 'bg-red-100', border: 'border-red-600', text: 'text-red' },
		yellow: { bg: 'bg-yellow-100', border: 'border-yellow-600', text: 'text-yellow' },
		green: { bg: 'bg-green-100', border: 'border-green-600', text: 'text-green' },
		cyan: { bg: 'bg-cyan-100', border: 'border-cyan-600', text: 'text-cyan' },
		indigo: { bg: 'bg-primary-100', border: 'border-primary', text: 'text-primary' },
		gray: { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-800' }
	};

	function handleClick() {
		onClick && onClick(text);
	}
</script>

<button
	class={`rounded-lg  px-3 py-2 ${
		isSelected
			? `${themeMap[theme].bg} ${themeMap[theme].text}`
			: `${themeMap[theme].bg} text-gray-800`
	} ${themeMap[theme].border} ${classes}`}
	on:click={handleClick}
>
	{text}
</button>
