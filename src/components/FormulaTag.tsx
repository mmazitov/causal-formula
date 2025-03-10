import React from 'react';
import { Tag } from '../store/store';
import TagDropdown from './TagDropdown';

interface FormulaTagProps {
	tag: Tag;
	onRemove: () => void;
}

const FormulaTag: React.FC<FormulaTagProps> = ({ tag, onRemove }) => {
	return (
		<span className="inline-flex items-center px-2 py-1 mx-1 text-blue-800 bg-blue-100 rounded">
			{tag.name}
			<TagDropdown tag={tag} />
			<button
				onClick={onRemove}
				className="ml-1 text-blue-500 hover:text-blue-700"
				aria-label="Remove tag"
			>
				×
			</button>
		</span>
	);
};

export default FormulaTag;
