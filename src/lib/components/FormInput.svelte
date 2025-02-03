<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Label from './ui/label/label.svelte';

	export let id: string;
	export let label: string;
	export let bindValue: string | number | undefined;
	export let subTitle: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let type = '';
</script>

<div class={`flex w-full max-w-lg items-center justify-between gap-4`}>
	<Label class={'w-24'} for={id}
		>{label}
		{#if subTitle}
			<span class="text-xs">{subTitle}</span>
		{/if}</Label
	>
	<Input
		class={'block max-w-36 text-base'}
		{id}
		type={type || 'text'}
		name={id}
		bind:value={bindValue}
		{required}
		{disabled}
		min="1"
		max="4"
	/>
</div>
