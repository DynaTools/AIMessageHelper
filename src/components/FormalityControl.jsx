import React from 'react';

const formalityLevels = [
  { value: 'casual', label: 'Casual' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'formal', label: 'Formal' },
  { value: 'very_formal', label: 'Very Formal' },
];

const FormalityControl = ({ value, onChange }) => {
  const currentIndex = formalityLevels.findIndex(level => level.value === value);

  return (
    <div className="my-4">
      <label htmlFor="formality-level" className="block text-sm font-medium text-gray-700 mb-2">
        Formality Level
      </label>
      
      <input
        id="formality-level"
        type="range"
        min="0"
        max={formalityLevels.length - 1}
        value={currentIndex}
        onChange={(e) => onChange(formalityLevels[e.target.value].value)}
        className="formality-slider w-full"
      />
      
      <div className="flex justify-between mt-2">
        {formalityLevels.map(level => (
          <span key={level.value} className="text-xs text-gray-500">
            {level.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FormalityControl; 