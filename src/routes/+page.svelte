<script lang="ts">
	import FormDate from '$lib/components/FormDate.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormPrice from '$lib/components/FormPrice.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { DateValue } from '@internationalized/date';
	import { onMount } from 'svelte';
	import type { Trades } from '../types';
	import TradeRow from '$lib/components/TradeRow.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { Home, Notebook } from 'lucide-svelte';

	let buyer = '';
	let seller = '';
	let minPrice: number | string = '';
	let maxPrice: number | string = '';
	let minTimestamp: DateValue | undefined = undefined;
	let maxTimestamp: DateValue | undefined = undefined;
	let season: number | undefined = undefined;
	let category: string = 'All';
	let sortVal: string = 'Timestamp';
	let orderVal: string = 'Desc';

	let trades: Array<Trades> = [];
	let info: { count: number; update: string } = {} as { count: number; update: string };
	let pageNum = 0;
	let observer: IntersectionObserver | null = null;
	let lastItemRef: HTMLTableRowElement | null = null;
	onMount(async () => {
		load();

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					load();
					observer!.unobserve(entry.target);
				}
			});
		});
	});

	async function load() {
		pageNum += 1;
		const inforeq = await fetch('https://bazaar.kractero.com/tradestotal');
		info = await inforeq.json();
		const req = await fetch(`https://bazaar.kractero.com/tradesjson?page=${pageNum}`);
		const newTrades = await req.json();

		if (newTrades.length > 0) {
			trades = [...trades, ...newTrades]; // Append new trades to the existing list
			trades[trades.length - 1].last = true;
		}
	}

	function handleLastItem(node: HTMLTableRowElement | null) {
		if (observer) {
			if (lastItemRef) {
				observer.unobserve(lastItemRef);
			}
			lastItemRef = node;
			if (lastItemRef) {
				observer.observe(lastItemRef);
			}
		}
	}
</script>

<header class="mb-10 flex flex-col items-center justify-center pt-40">
	<h2 class="text-5xl font-bold">Bazaar</h2>
	<div class="mt-4 flex gap-2">
		<Button variant="ghost" href="/"><Home class="size-6" /></Button>
		<ThemeSwitcher />
		<Button variant="ghost" href="/docs"><Notebook class="size-6" /></Button>
	</div>
	<p class="my-4">
		Data last modified {info.update}
	</p>
	<p>
		Counting {info.count ? info.count.toLocaleString() : info.count} trades since April 1st 2018.
	</p>
</header>
<main>
	<div class="flex flex-col items-center justify-center">
		<form class="flex w-80 flex-col gap-4">
			<div class="flex justify-between gap-2">
				<FormInput bind:bindValue={buyer} id="buyer" label="Buyer" />
			</div>
			<div class="flex justify-between gap-2">
				<FormInput bind:bindValue={seller} id="seller" label="Seller" />
			</div>
			<div class="flex justify-between gap-2">
				<FormPrice bind:maxValue={maxPrice} bind:minValue={minPrice} />
			</div>
			<div class="flex justify-between gap-2">
				<FormDate bind:maxTimestamp bind:minTimestamp />
			</div>
			<div class="flex justify-between gap-2">
				<FormInput bind:bindValue={season} id="season" label="Season" type="number" />
			</div>
			<div class="flex justify-between gap-2">
				<FormSelect
					bind:bindValue={category}
					id="category"
					items={['All', 'Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Epic', 'Legendary']}
					label="Rarity"
				/>
			</div>
			<div class="flex justify-between gap-2">
				<FormSelect
					bind:bindValue={sortVal}
					id="sortVal"
					items={['Timestamp', 'Price']}
					label="Sort By"
				/>
			</div>
			<div class="flex justify-between gap-2">
				<FormSelect bind:bindValue={orderVal} id="orderVal" items={['Desc', 'Asc']} label="Order" />
			</div>
			<Button type="submit" class="mx-auto" variant={'default'}>Submit</Button>
		</form>
		{#if trades.length > 0}
			<div class="mb-40 mt-5">
				<p class="total mb-4 text-center"></p>
				<table class="w-full table-fixed lg:max-w-5xl">
					<thead>
						<tr>
							<th class="w-6 border border-slate-600 p-2 sm:w-12">Card</th>
							<th class="w-6 border border-slate-600 p-2 sm:w-12">Seller</th>
							<th class="w-6 border border-slate-600 p-2 sm:w-12">Buyer</th>
							<th class="w-2 border border-slate-600 p-2">Price</th>
							<th class="w-6 border border-slate-600 p-2 sm:w-12">Timestamp</th>
						</tr>
					</thead>
					<tbody id="trades">
						{#each trades as trade, i}
							<TradeRow {trade} setRef={i === trades.length - 1 ? handleLastItem : () => {}} />
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</main>
