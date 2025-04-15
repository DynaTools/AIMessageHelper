import React from 'react';

const MessageInput = ({ value, onChange, placeholder, outputText, setOutputText }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-1">
          Input Text
        </label>
        <textarea
          id="input-text"
          rows={5}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">
            Characters: {value.length}
          </span>
          {value.length > 1000 && (
            <span className="text-xs text-red-500">
              Warning: Large text may consume more tokens
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <label htmlFor="output-text" className="block text-sm font-medium text-gray-700">
            Output
          </label>
          <button
            type="button"
            onClick={() => {
              if (outputText) {
                navigator.clipboard.writeText(outputText);
              }
            }}
            className={`text-xs rounded px-2 py-1 ${outputText ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            disabled={!outputText}
          >
            Copy to Clipboard
          </button>
        </div>
        <div 
          className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50 text-output p-3"
        >
          {outputText ? (
            <p className="whitespace-pre-line">{outputText}</p>
          ) : (
            <p className="text-gray-400 italic">Translation output will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInput; 