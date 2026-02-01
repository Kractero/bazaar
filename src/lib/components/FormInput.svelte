<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Label from './ui/label/label.svelte';

	interface Props {
		id: string;
		label: string;
		bindValue: string | number | undefined;
		subTitle?: string;
		required?: boolean;
		disabled?: boolean;
		type?: string;
	}

	let {
		id,
		label,
		bindValue = $bindable(),
		subTitle = '',
		required = false,
		disabled = false,
		type = ''
	}: Props = $props();
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
