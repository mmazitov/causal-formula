// src/components/TagDropdown.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import fetchData from '../hooks/useFetch';
import useFormulaStore, { Tag } from '../store/store';

interface TagDropdownProps {
	tag: Tag;
}

const TagDropdown: React.FC<TagDropdownProps> = ({ tag }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { data } = useQuery('tagOptions', fetchData);
	const { tokens, setTokens } = useFormulaStore();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleValueChange = (value: number) => {
		// Create a new array with the updated tag
		const newTokens = tokens.map((token) => {
			if (typeof token !== 'string' && token.id === tag.id) {
				return { ...token, value };
			}
			return token;
		});

		// Update the state with the new tokens array
		setTokens(newTokens);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			<button
				className="px-1 ml-1 text-xs text-gray-500 rounded hover:bg-gray-200"
				onClick={() => setIsOpen(!isOpen)}
				type="button"
			>
				▼
			</button>

			{isOpen && (
				<div className="absolute z-50 w-48 mt-1 bg-white border rounded shadow-lg">
					<div className="p-2 border-b">
						<div className="font-medium">{tag.name}</div>
						<div className="text-xs text-gray-600">{tag.type}</div>
						<div className="mt-1 text-sm">
							Current value:{' '}
							<span className="font-medium">{tag.value ?? 'None'}</span>
						</div>
					</div>

					<div className="overflow-y-auto max-h-40">
						{data?.map((item: any) => (
							<div
								key={item.index}
								className="p-2 cursor-pointer hover:bg-gray-100"
								onClick={() => handleValueChange(item.value)}
							>
								Set value to: {item.value}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default TagDropdown;
