export interface Trades {
	buyer: string;
	card_id: number;
	card_name: string;
	category: 'c' | 'uc' | 'r' | 'u' | 'ur' | 'e' | 'l';
	price: number;
	season: number;
	seller: string;
	timestamp: string;
	last: boolean;
}
