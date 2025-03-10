import { useState } from 'react';
import './App.css';
import FormulaDisplay from './components/FormulaDisplay';
import FormulaTag from './components/FormulaTag';
import Input from './components/Input';
import Suggestions from './components/Suggestions';
import useFormulaStore from './store/store';

function App() {
	const { inputValue, setInputValue, tokens, addToken, removeToken } =
		useFormulaStore();

	const [showSuggestions, setShowSuggestions] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		setShowSuggestions(true);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Handle special keys
		if (e.key === 'Backspace' && inputValue === '' && tokens.length > 0) {
			// Remove the last token when backspace is pressed and input is empty
			removeToken(tokens.length - 1);
		} else if (e.key === 'Enter' && inputValue.trim() !== '') {
			// Handle operators and numbers
			const value = inputValue.trim();

			// Check if the input is a valid number
			const isNumber = /^[0-9]+(\.[0-9]+)?$/.test(value);

			// Check if the input is an operator
			const isOperator = ['+', '-', '*', '/', '(', ')', '^'].includes(value);

			if (isNumber || isOperator) {
				addToken(value);
				setInputValue('');
				e.preventDefault();
			}
		}
	};

	const handleInputBlur = () => {
		setTimeout(() => {
			setShowSuggestions(false);
		}, 200);
	};

	return (
		<div className="max-w-2xl p-6 mx-auto">
			<h1 className="mb-4 text-2xl font-bold">Formula Builder</h1>

			<div className="relative p-2 border rounded">
				<div className="flex flex-wrap items-center mb-2">
					{tokens.map((token, index) => {
						if (typeof token === 'string') {
							return (
								<span key={index} className="mx-1 font-mono">
									{token}
								</span>
							);
						} else {
							return (
								<FormulaTag
									key={token.id}
									tag={token}
									onRemove={() => removeToken(index)}
								/>
							);
						}
					})}
					<Input
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleInputKeyDown}
						onFocus={() => setShowSuggestions(true)}
						onBlur={handleInputBlur}
					/>
				</div>

				{showSuggestions && <Suggestions />}
			</div>

			<FormulaDisplay />

			<div className="p-4 mt-6 border rounded bg-gray-50">
				<h2 className="mb-2 text-lg font-medium">Instructions</h2>
				<ul className="pl-5 space-y-1 list-disc">
					<li>Type variable names to see autocomplete suggestions</li>
					<li>Use operators: +, -, *, /, ^, (, )</li>
					<li>Press Enter to add numbers or operators</li>
					<li>Backspace when empty will delete the last token</li>
					<li>Click the dropdown (▼) on any tag to modify its value</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
