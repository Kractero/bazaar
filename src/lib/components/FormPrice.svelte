<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Label from './ui/label/label.svelte';

	interface Props {
		minValue: string | number;
		maxValue: string | number;
	}

	let { minValue = $bindable(), maxValue = $bindable() }: Props = $props();

	function validateValues() {
		if (!minValue || !maxValue) {
			return;
		}

		if (Number(minValue) > Number(maxValue)) {
			minValue = Number(maxValue);
		}
		if (Number(maxValue) < Number(minValue)) {
			maxValue = Number(minValue);
		}
	}
</script>

<div class={`flex w-full max-w-lg items-center justify-between gap-4`}>
	<Label class={'w-24'} for="price">Price</Label>
	<div>
		<Input
			class={'block max-w-36 text-left text-base'}
			id="minprice"
			name="minprice"
			min="0"
			step="0.01"
			type={'number'}
			bind:value={minValue}
			on:input={validateValues}
		/>
		<Input
			class={'mt-3 block max-w-36 text-left text-base'}
			id="maxprice"
			name="maxprice"
			min="0"
			step="0.01"
			type={'number'}
			bind:value={maxValue}
			on:input={validateValues}
		/>
	</div>
</div>
