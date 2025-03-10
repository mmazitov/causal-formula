// src/components/FormulaDisplay.tsx
import React from 'react';
import useFormulaStore from '../store/store';

const FormulaDisplay: React.FC = () => {
	const { tokens, calculateFormula } = useFormulaStore();

	// Calculate the result
	const result = calculateFormula();

	// Generate a text representation of the formula
	const formulaText = tokens
		.map((token) => {
			if (typeof token === 'string') {
				return token;
			} else {
				return token.name;
			}
		})
		.join(' ');

	return (
		<div className="mt-4">
			<div className="p-3 border rounded bg-gray-50">
				{tokens.length === 0 ? (
					<span className="text-gray-400">Your formula will appear here</span>
				) : (
					<div>
						<strong>Formula:</strong> {formulaText}
					</div>
				)}
			</div>

			{tokens.length > 0 && (
				<div className="p-2 mt-2 bg-gray-100 rounded">
					<strong>Result:</strong>{' '}
					{result !== null ? result : 'Invalid formula'}
				</div>
			)}
		</div>
	);
};

export default FormulaDisplay;
