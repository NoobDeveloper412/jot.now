import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function getFileUrl(filename: string): string {
	const API_BASE_URL = 'http://localhost:3000';
	return `${API_BASE_URL}${filename}`;
}

export function navigateTo(endpoint?: string, id?: string | number) {
	if (browser) {
		const currentPath = get(page).url.pathname;

		let newPath = currentPath;
		if (endpoint) {
			newPath += `/${endpoint}`;
		}
		if (id) {
			newPath += `/${id}`;
		}

		goto(newPath);
	}
}

/**
 * Formats a time value in seconds into a string in the format "MM:SS" or "HH:MM:SS" if over an hour.
 *
 * @param seconds - The time in seconds to format.
 * @returns A string representing the formatted time.
 */
export function formatTime(seconds: number): string {
	if (isNaN(seconds) || seconds < 0) return '00:00';

	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (hrs > 0) {
		return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
	}
	return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
