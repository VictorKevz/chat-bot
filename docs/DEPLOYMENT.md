# Deployment Guide

This guide explains how to deploy the VCTR AI Chat Assistant to production using Vercel. It covers environment setup, configuration, and best practices for a smooth deployment.

## Prerequisites

- [Vercel account](https://vercel.com/signup)
- Node.js (v18+ recommended)
- Deepgram API key
- Groq API key
- Supabase project credentials

## Steps

1. **Clone the repository**
   ```sh
git clone https://github.com/VictorKevz/chat-bot.git
cd chat-bot
```

2. **Install dependencies**
   ```sh
npm install
```

3. **Configure environment variables**
   - Create a `.env.local` file in the root directory:
     ```env
     DEEPGRAM_API_KEY=your_deepgram_key
     GROQ_API_KEY=your_groq_key
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Test locally**
   ```sh
npm run dev
```
   - Visit `http://localhost:5173` to verify the app works.

5. **Deploy to Vercel**
   - Push your code to GitHub.
   - Import the project in Vercel and link your repository.
   - Add the same environment variables in Vercel's dashboard.
   - Deploy!

## Best Practices

- Keep API keys secret and never commit them to source control.
- Monitor usage and errors in Vercel and Deepgram dashboards.
- Use Vercel's preview deployments for testing changes before production.

## Troubleshooting

- **Build errors**: Check Node.js version and environment variables.
- **API errors**: Verify API keys and service status.
- **Audio issues**: Ensure Deepgram API is reachable and keys are valid.

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deepgram Documentation](https://developers.deepgram.com/docs/)
- [Groq Documentation](https://groq.com/docs)
- [Supabase Documentation](https://supabase.com/docs)



For further help, contact Victor Kevz at contact@victorkevz.com.
