// src/components/Suggestions.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package
import fetchData from '../hooks/useFetch';
import useFormulaStore from '../store/store';

interface SuggestionItem {
	index: number;
	name: string;
	type: string;
	value?: number;
}

const Suggestions: React.FC = () => {
	const { inputValue, setInputValue, tokens, addToken } = useFormulaStore();
	const { data, error, isLoading } = useQuery('autocompleteData', fetchData);

	if (isLoading)
		return <div className="p-2 text-gray-500">Loading suggestions...</div>;
	if (error)
		return <div className="p-2 text-red-500">Error loading suggestions</div>;

	// Support autocomplete after operand is written
	const lastChar = inputValue.trim().slice(-1);
	const isOperand = ['+', '-', '*', '/', '(', ')', '^'].includes(lastChar);
	const searchTerm = isOperand ? '' : inputValue.trim();

	const filteredSuggestions =
		data?.filter((item: SuggestionItem) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		) || [];

	const handleSelectSuggestion = (suggestion: SuggestionItem) => {
		// Check if we need to add an operand before the tag
		const lastToken = tokens.length > 0 ? tokens[tokens.length - 1] : null;

		// If last token was a tag and current input doesn't start with an operand, add a multiplication operand
		if (
			lastToken &&
			typeof lastToken !== 'string' &&
			!isOperand &&
			inputValue.trim() !== ''
		) {
			addToken('*');
		}

		// Add the selected tag
		const newTag = {
			id: uuidv4(),
			name: suggestion.name,
			type: suggestion.type,
			value: suggestion.value,
		};

		addToken(newTag);
		setInputValue('');
	};

	return (
		<div className="absolute left-0 z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg top-full max-h-60">
			{filteredSuggestions.length > 0 ? (
				filteredSuggestions.map((suggestion: SuggestionItem) => (
					<div
						key={suggestion.index}
						className="p-2 cursor-pointer hover:bg-gray-100"
						onMouseDown={() => handleSelectSuggestion(suggestion)}
					>
						<div className="font-medium">{suggestion.name}</div>
						<div className="text-xs text-gray-600">{suggestion.type}</div>
					</div>
				))
			) : (
				<div className="p-2 text-gray-500">No suggestions found</div>
			)}
		</div>
	);
};

export default Suggestions;
