import React, { useState, useEffect } from 'react';
import { auth } from './auth/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import LanguageSelector from './components/LanguageSelector';
import FormalityControl from './components/FormalityControl';
import GrammarExercises from './components/GrammarExercises';
import AISettings from './components/AISettings';
import ControlButtons from './components/ControlButtons';
import MessageInput from './components/MessageInput';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [apiEngine, setApiEngine] = useState('openai');
  const [sourceLang, setSourceLang] = useState('english');
  const [targetLang, setTargetLang] = useState('spanish');
  const [formalityLevel, setFormalityLevel] = useState('neutral');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessedHash, setLastProcessedHash] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">AI Message Quick Language Helper</h1>
          <div className="flex items-center space-x-4">
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Translation & Formality Section */}
            <div className="col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Translation & Formality</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LanguageSelector 
                    label="Source Language"
                    value={sourceLang}
                    onChange={setSourceLang}
                  />
                  <LanguageSelector 
                    label="Target Language"
                    value={targetLang}
                    onChange={setTargetLang}
                  />
                </div>
                <FormalityControl 
                  value={formalityLevel}
                  onChange={setFormalityLevel}
                />
                <MessageInput 
                  value={inputText}
                  onChange={setInputText}
                  placeholder="Enter text to translate or adapt..."
                  outputText={outputText}
                  setOutputText={setOutputText}
                />
                <ControlButtons
                  apiKey={apiKey}
                  apiEngine={apiEngine}
                  inputText={inputText}
                  sourceLang={sourceLang}
                  targetLang={targetLang} 
                  formalityLevel={formalityLevel}
                  setOutputText={setOutputText}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                  lastProcessedHash={lastProcessedHash}
                  setLastProcessedHash={setLastProcessedHash}
                />
              </div>
            </div>

            {/* Configuration & Login Section */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">AI Configuration</h2>
                <AISettings 
                  apiKey={apiKey}
                  setApiKey={setApiKey}
                  apiEngine={apiEngine}
                  setApiEngine={setApiEngine}
                />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Grammar Exercises</h2>
                <GrammarExercises 
                  targetLang={targetLang}
                  apiKey={apiKey}
                  apiEngine={apiEngine}
                  setIsProcessing={setIsProcessing}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 