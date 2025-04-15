import React, { useState } from 'react';
import { sha256 } from 'crypto-js';

const ControlButtons = ({
  apiKey,
  apiEngine,
  inputText,
  sourceLang,
  targetLang,
  formalityLevel,
  setOutputText,
  isProcessing,
  setIsProcessing,
  lastProcessedHash,
  setLastProcessedHash
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to create a hash of the request to avoid duplicate API calls
  const createRequestHash = () => {
    const requestData = `${inputText}|${sourceLang}|${targetLang}|${formalityLevel}|${apiEngine}`;
    return sha256(requestData).toString();
  };

  const handleTranslate = async () => {
    if (!apiKey) {
      alert('Please enter a valid API key in the AI Configuration section');
      return;
    }

    if (!inputText.trim()) {
      alert('Please enter some text to translate');
      return;
    }

    // Check if text is too long
    if (inputText.length > 1000) {
      const confirm = window.confirm('Your text is quite long and may consume more tokens. Do you want to proceed?');
      if (!confirm) return;
    }

    // Check if this exact request has been processed before
    const currentHash = createRequestHash();
    if (currentHash === lastProcessedHash) {
      alert('This exact request has already been processed. Make some changes to translate again.');
      return;
    }

    setIsProcessing(true);

    try {
      // In a real implementation, we would call the actual AI API here
      // For demo purposes, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Construct the prompt that would be sent to the AI API
      // eslint-disable-next-line no-unused-vars
      const prompt = `You are a professional linguistic assistant.

Your task:
- Translate or adapt the following text, strictly respecting:
  - Languages: ${sourceLang} → ${targetLang}
  - Formality: ${formalityLevel}
  - Grammatical Context: general

Original text:
"${inputText}"

Respond ONLY with the adapted/translated text.
Do NOT include explanations or additional comments.`;

      // For demo purposes, we'll just echo back some modified text
      // In a real implementation, this would be the response from the AI API
      let demoResponse;
      
      if (targetLang === 'spanish') {
        demoResponse = `${inputText} [Translated to Spanish with ${formalityLevel} formality]`;
      } else if (targetLang === 'french') {
        demoResponse = `${inputText} [Translated to French with ${formalityLevel} formality]`;
      } else {
        demoResponse = `${inputText} [Translated to ${targetLang} with ${formalityLevel} formality]`;
      }

      setOutputText(demoResponse);
      setLastProcessedHash(currentHash);
    } catch (error) {
      console.error('Translation error:', error);
      alert('An error occurred during translation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    
    // Simulating file input click
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.doc,.docx,.pdf';
    
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // In a real app, you'd process the file content here
        alert(`File "${file.name}" selected. In a complete implementation, the content would be extracted and placed in the input field.`);
      }
      setIsUploading(false);
    };
    
    fileInput.click();
  };

  const handleDownload = () => {
    if (!inputText && !document.getElementById('output-text').textContent) {
      alert('There is no content to download');
      return;
    }
    
    setIsDownloading(true);
    
    try {
      const outputContent = document.getElementById('output-text').textContent || inputText;
      const blob = new Blob([outputContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'translated-text.txt';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      alert('An error occurred while downloading. Please try again.');
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <button
        type="button"
        onClick={handleTranslate}
        disabled={isProcessing || !apiKey}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Translate
          </>
        )}
      </button>
      
      <button
        type="button"
        onClick={handleUpload}
        disabled={isUploading || isProcessing}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isUploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
          </>
        )}
      </button>
      
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading || isProcessing}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading...
          </>
        ) : (
          <>
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4 4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </>
        )}
      </button>
    </div>
  );
};

export default ControlButtons; 