import React, { useEffect, useRef } from 'react';

interface InputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onFocus: () => void;
	onBlur: () => void;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	onKeyDown,
	onFocus,
	onBlur,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// Focus input when component mounts
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<input
			ref={inputRef}
			type="text"
			className="flex-grow px-2 py-1 outline-none"
			placeholder="Type to add variables or operators"
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
};

export default Input;
