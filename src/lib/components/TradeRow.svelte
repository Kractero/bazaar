<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Trades } from '../../types';

	interface Props {
		trade: Trades;
		setRef: (node: HTMLTableRowElement | null) => void;
	}

	let { trade, setRef }: Props = $props();

	let row: HTMLTableRowElement = $state();

	run(() => {
		setRef(row);
	}); // Bind `row` to the parent via `setRef`
</script>

<tr bind:this={row}>
	<td class="break-words border border-slate-600 p-2 text-xs sm:text-base">
		<a
			target="_blank"
			rel="noreferrer noopener"
			class={`hover:underline ${
				trade.category === 'c'
					? 'text-gray-500'
					: trade.category === 'u'
						? 'text-green-500'
						: trade.category === 'r'
							? 'text-blue-500'
							: trade.category === 'ur'
								? 'text-purple-500'
								: trade.category === 'e'
									? 'text-yellow-600'
									: trade.category === 'l'
										? 'text-yellow-400'
										: ''
			}`}
			href={`https://nationstates.net/page=deck/card=${trade.card_id}/season=${trade.season}`}
		>
			S{trade.season}
			{trade.card_name}
		</a>
	</td>
	<td class="break-words border border-slate-600 p-2 text-xs sm:text-base">
		<a
			target="_blank"
			rel="noreferrer noopener"
			class="hover:underline"
			href={`https://nationstates.net/nation=${trade.seller}`}
		>
			{trade.seller}
		</a>
	</td>
	<td class="break-words border border-slate-600 p-2 text-xs sm:text-base">
		<a
			target="_blank"
			rel="noreferrer noopener"
			class="hover:underline"
			href={`https://nationstates.net/nation=${trade.buyer}`}
		>
			{trade.buyer}
		</a>
	</td>
	<td class="border border-slate-600 p-2 text-xs sm:text-base">{trade.price}</td>
	<td class="break-words border border-slate-600 p-2 text-[0.5rem] sm:text-base">
		{trade.timestamp}
	</td>
</tr>
