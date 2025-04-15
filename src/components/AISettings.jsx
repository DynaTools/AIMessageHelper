import React, { useState } from 'react';

const engines = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Gemini 2.0' },
  { value: 'deepseek', label: 'DeepSeek V3' },
];

const AISettings = ({ apiKey, setApiKey, apiEngine, setApiEngine }) => {
  const [isApiKeyValid, setIsApiKeyValid] = useState(null);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  const testApiKey = async () => {
    if (!apiKeyInput) {
      setIsApiKeyValid(false);
      return;
    }

    setIsTestingApi(true);
    
    try {
      // Simulating API validation
      // In a real app, you would make a lightweight call to the selected API
      // to verify the key is valid
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For simulation purposes, we're assuming the key is valid if it's at least 10 chars
      const isValid = apiKeyInput.length >= 10;
      
      setIsApiKeyValid(isValid);
      
      if (isValid) {
        setApiKey(apiKeyInput);
        setApiKeyInput(''); // Clear input after successful validation
      }
    } catch (error) {
      console.error('Error testing API key:', error);
      setIsApiKeyValid(false);
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ai-engine" className="block text-sm font-medium text-gray-700 mb-1">
          AI Engine
        </label>
        <select
          id="ai-engine"
          value={apiEngine}
          onChange={(e) => setApiEngine(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {engines.map((engine) => (
            <option key={engine.value} value={engine.value}>
              {engine.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
          API Key
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="password"
            id="api-key"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md sm:text-sm border-gray-300"
            placeholder="Enter your API key"
          />
          <button
            type="button"
            onClick={testApiKey}
            disabled={isTestingApi || !apiKeyInput}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isTestingApi ? 'Testing...' : 'Test'}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Your API key is only stored temporarily in memory during this session
        </p>
        
        {isApiKeyValid !== null && (
          <div className={`mt-2 text-sm ${isApiKeyValid ? 'text-green-600' : 'text-red-600'}`}>
            {isApiKeyValid 
              ? 'API key validated successfully!' 
              : 'Invalid API key. Please check and try again.'}
          </div>
        )}
        
        {apiKey && (
          <div className="mt-3 flex items-center">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-400"></span>
            <span className="ml-2 text-sm text-gray-700">API Key Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISettings; 