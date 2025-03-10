// src/store/store.ts
import { create } from 'zustand';

export interface Tag {
	id: string;
	name: string;
	value?: number;
	type?: string;
}

interface FormulaState {
	inputValue: string;
	setInputValue: (inputValue: string) => void;
	tokens: (Tag | string)[];
	cursorPosition: number;
	setTokens: (tokens: (Tag | string)[]) => void;
	setCursorPosition: (position: number) => void;
	selectedTagId: string | null;
	setSelectedTagId: (id: string | null) => void;
	addToken: (token: Tag | string) => void;
	removeToken: (index: number) => void;
	calculateFormula: () => number | null;
}

const useFormulaStore = create<FormulaState>((set, get) => ({
	inputValue: '',
	setInputValue: (inputValue) => set({ inputValue }),
	tokens: [],
	cursorPosition: 0,
	setTokens: (tokens) => set({ tokens }),
	setCursorPosition: (cursorPosition) => set({ cursorPosition }),
	selectedTagId: null,
	setSelectedTagId: (id) => set({ selectedTagId: id }),

	addToken: (token) => {
		set((state) => ({
			tokens: [...state.tokens, token],
		}));
	},

	removeToken: (index) => {
		set((state) => {
			const newTokens = [...state.tokens];
			newTokens.splice(index, 1);
			return { tokens: newTokens };
		});
	},

	calculateFormula: () => {
		const { tokens } = get();

		try {
			// Convert tokens to a calculable expression
			const expression = tokens
				.map((token) => {
					if (typeof token === 'string') {
						return token;
					} else {
						return token.value !== undefined ? token.value : 0;
					}
				})
				.join(' ');

			// Use Function constructor to evaluate the expression
			// Note: This is for demo purposes. For production, use a secure formula parser
			return Function(`"use strict"; return (${expression})`)();
		} catch (error) {
			console.error('Error calculating formula:', error);
			return null;
		}
	},
}));

export default useFormulaStore;
