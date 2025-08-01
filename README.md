# VCTR AI Chat Assistant

An intelligent chat assistant built with modern web technologies, featuring real-time AI conversations and speech-to-text transcription capabilities.

## Project Overview

I developed this full-stack chat application to demonstrate proficiency in modern web development while exploring the integration of AI services in real-world applications. The project showcases React patterns, serverless architecture, and thoughtful UX design principles.

## Live Demo

**[View Live Application](https://chatbot.victorkevz.com/)**

## Screenshots

### Main Chat Interface
![Default Chat Interface](/public/screenshots/default.png)
*Clean, modern chat interface with intuitive design*

### AI Conversations
![General Chat](/public/screenshots/general-chat.png)
*Intelligent conversations powered by Groq's LLaMA models*

### Project Portfolio Integration
![Projects Chat](/public/screenshots/projects-chat.png)
*Dynamic project showcase with real-time data fetching*

![Project Modal](/public/screenshots/project-modal.png)
*Detailed project information in elegant modal design*

### Speech-to-Text Feature
![Speech to Text](/public/screenshots/speech-to-text.png)
*Real-time audio transcription and text-to-speech powered by Deepgram and Groq*

### Interactive Features
![FAQs Active](/public/screenshots/faqs-active.png)
*Interactive FAQ section for quick access to common questions*

![Delete Modal](/public/screenshots/delete-modal.png)
*Thoughtful confirmation dialogs for better user experience*


## Key Features

- **Intelligent Conversations**: Powered by Groq's LLaMA models for fast, contextual responses
- **Speech-to-Text**: Real-time audio transcription using Groq's Whisper API
- **Text-to-Speech**: Natural-sounding AI voices using Deepgram TTS
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Project Showcase**: Dynamic project portfolio integration
- **Project Modals**: Clickable project previews open modals with detailed information
- **FAQs**: Clickable FAQ bubbles help users quickly access common questions; open/close state is persisted with localStorage
- **Chat History Persistence**: Chat history and open FAQs are saved in localStorage for session continuity
- **Delete Chat Option**: Users can delete chat history, triggering a warning modal for confirmation
- **Form Validation**: Input field is validated for completeness and correctness
- **MUI Alerts**: Success and error alerts for chat deletion, transcription, TTS conversion, and invalid forms.
- **Framer Motion Animations**: Subtle, smooth UI transitions and animations for enhanced user experience
- **Real-time Interactions**: Smooth animations and loading states
- **Dynamic Data**: Fetches data from Supabase



## Technical Highlights

- **Frontend**: React 18 + TypeScript + Vite for optimal development experience
- **Styling**: Tailwind CSS for responsive design patterns
- **UI Animations**: Framer Motion for subtle, performant transitions
- **Component Library**: MUI for alerts and UI feedback.
- **State Management**: React hooks with optimized re-rendering
- **Persistence**: localStorage for chat history and FAQ state
- **API Integration**: Groq AI services for chat and transcription, Deepgram for text-to-speech
- **Audio Processing**: MediaRecorder API for speech-to-text, Deepgram TTS for audio playback
- **Form Validation**: Ensures robust user input handling
- **Deployment**: Vercel serverless functions for scalable backend

## Why I Built This

This project represents my exploration of modern AI integration patterns and demonstrates my ability to:

1. **Architect scalable solutions** using serverless technologies
2. **Integrate complex APIs** while maintaining excellent user experience
3. **Handle real-time data** with proper loading states and error handling
4. **Design intuitive interfaces** that work across all device types
5. **Write maintainable code** with TypeScript and modular architecture

## Development Journey

The project evolved through several iterations, each teaching valuable lessons about full-stack development and AI integration. Key challenges I overcame include optimizing audio processing for web browsers, switching from the Web Speech API to Deepgram for TTS, implementing robust error handling for AI services, and creating seamless user interactions.


## Documentation

- [📁 Architecture Overview](./docs/ARCHITECTURE.md)
- [🚀 Deployment Guide](./docs/DEPLOYMENT.md)

## Contact

**Victor Kevz**
- Portfolio: [chatbot.victorkevz.com](https://chatbot.victorkevz.com/)
- CV Site: [victorkevz.com](https://victorkevz.com/)
- LinkedIn: [Victor Kuwandira](https://www.linkedin.com/in/victor-kuwandira/)
- Email: contact@victorkevz.com
