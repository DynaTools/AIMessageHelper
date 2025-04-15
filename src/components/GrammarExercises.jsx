import React, { useState } from 'react';

const grammarContexts = [
  { id: 'future', label: 'Future Tense', prompt: 'future tense' },
  { id: 'past', label: 'Past Tense', prompt: 'past tense' },
  { id: 'imperfect', label: 'Imperfect Tense', prompt: 'imperfect tense' },
];

const GrammarExercises = ({ targetLang, apiKey, apiEngine, setIsProcessing }) => {
  const [exercises, setExercises] = useState({
    future: '',
    past: '',
    imperfect: '',
  });
  const [isGenerating, setIsGenerating] = useState({
    future: false,
    past: false,
    imperfect: false,
  });

  const generateExercise = async (grammarContext) => {
    if (!apiKey) {
      alert('Please enter a valid API key in the AI Configuration section');
      return;
    }

    setIsGenerating(prev => ({ ...prev, [grammarContext.id]: true }));
    setIsProcessing(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would call the actual AI API here
      // For now, we'll generate dummy content
      const exampleExercises = {
        future: `1. Tomorrow, I ____ (go) to the store.
2. Next week, they ____ (travel) to Paris.
3. She ____ (call) you later tonight.`,
        past: `1. Yesterday, I ____ (visit) my grandmother.
2. Last month, we ____ (buy) a new car.
3. They ____ (eat) dinner at 8pm last night.`,
        imperfect: `1. When I was a child, I ____ (play) in the park every day.
2. He ____ (walk) to school every morning.
3. We ____ (live) in Spain for five years.`,
      };
      
      setExercises(prev => ({
        ...prev,
        [grammarContext.id]: exampleExercises[grammarContext.id],
      }));
    } catch (error) {
      console.error('Error generating exercise:', error);
    } finally {
      setIsGenerating(prev => ({ ...prev, [grammarContext.id]: false }));
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {grammarContexts.map((context) => (
        <div key={context.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">{context.label}</h3>
            <button
              type="button"
              onClick={() => generateExercise(context)}
              disabled={isGenerating[context.id] || !apiKey}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isGenerating[context.id] ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : 'Exercise'}
            </button>
          </div>
          
          {exercises[context.id] ? (
            <div className="bg-gray-50 rounded-md p-3 text-sm">
              <pre className="whitespace-pre-wrap">{exercises[context.id]}</pre>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              Click "Exercise" to generate {context.label.toLowerCase()} practice examples in {targetLang}
            </p>
          )}
        </div>
      ))}
      
      <div className="text-xs text-gray-500 mt-3">
        <p>Grammar exercises help you practice language constructs in context.</p>
      </div>
    </div>
  );
};

export default GrammarExercises; 