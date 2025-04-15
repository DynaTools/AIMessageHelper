# AI Message Quick Language Helper

A responsive web application for language translation and grammar exercises using multiple AI engines (OpenAI, Gemini 2.0, DeepSeek V3).

## Features

- **Secure Google Authentication**: Utilizes Firebase for secure login
- **Multiple AI Engines**: Support for OpenAI, Gemini 2.0, and DeepSeek V3
- **Translation & Formality Control**: Translate text with adjustable formality levels
- **Grammar Exercises**: Practice grammar with AI-generated exercises
- **Security & Privacy**: No persistent storage of sensitive data
- **Token Usage Optimization**: Efficient API calls with debouncing and hash comparison

## Project Structure

```
/src
 ├── auth/
 │    └── firebase.js       # Firebase configuration and auth methods
 ├── components/
 │    ├── Login.jsx         # Google authentication login screen
 │    ├── LanguageSelector.jsx  # Language dropdown component
 │    ├── FormalityControl.jsx  # Formality level slider
 │    ├── GrammarExercises.jsx  # Grammar practice sections
 │    ├── AISettings.jsx    # AI engine selection and API key input
 │    ├── ControlButtons.jsx    # Action buttons (translate, upload, etc.)
 │    └── MessageInput.jsx  # Text input and output display
 ├── utils/
 │    ├── debounce.js       # Debounce utility for API calls
 │    └── hash.js           # Text hashing utility for comparison
 ├── App.jsx                # Main application component
 └── index.js               # Entry point
/public
 └── index.html             # HTML template
```

## Setup and Configuration

### Prerequisites

- Node.js and npm installed
- Firebase account for authentication

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-message-quick-language-helper.git
   cd ai-message-quick-language-helper
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:
   ```
   npm start
   ```

### Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` to match your GitHub Pages URL:
   ```
   "homepage": "https://your-username.github.io/ai-message-quick-language-helper"
   ```

2. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Security Considerations

- API keys are stored only in memory (session state) and never persisted
- Google OAuth is used for secure authentication
- No sensitive user data is stored in localStorage or cookies
- Environment variables are used for any application secrets

## License

MIT 