# Medical Agent Setup Guide

## ✅ Setup Instructions

Follow these steps to get your medical voice agent running:

### 1. **Get Your VAPI Public Key**

1. Go to https://dashboard.vapi.ai/
2. Sign up or log in
3. Go to **Settings** → **API Keys**
4. Copy your **Public Key** (starts with `pk_test_` or `pk_live_`)

### 2. **Configure OpenAI in Vapi**

1. In your Vapi dashboard, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **OpenAI**
4. Add your OpenAI API key:
   - Get it from: https://platform.openai.com/api-keys
5. Save the credential

### 3. **Configure Your Environment**

Open `.env.local` in your project root and add:

```env
# Your Vapi Public Key (REQUIRED)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=pk_test_your_actual_key_here

# Clerk Authentication (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_key

# Optional - For transcription
NEXT_PUBLIC_ASSEMBLYAI_KEY=your_key_here

# Optional - For other features
GEMINI_API_KEY=your_key_here
```

### 4. **Restart Your Dev Server**

```powershell
# Stop the current server (Ctrl+C)
npm run dev
```

## 🎯 How to Test

1. Navigate to: `http://localhost:3000/dashboard/medical-agent/[sessionId]`
2. Click **"Start a Call"** button
3. Allow microphone access when prompted
4. Speak to the AI doctor

## 🔍 Troubleshooting

### Error: "Meeting ended due to ejection"

**Cause:** Your VAPI public key is invalid or missing credentials

**Solution:**
1. Check `.env.local` has a valid `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
2. Verify OpenAI credentials in Vapi dashboard
3. Check console for specific error messages

### Error: "Microphone permission denied"

**Solution:**
1. Click the microphone icon in browser address bar
2. Select "Allow" for microphone access
3. Refresh the page and try again

### Call starts but no audio

**Check:**
1. Browser console for errors
2. Volume level indicators in console
3. Make sure microphone is not muted on your device

### "Vapi is not ready"

**Solution:**
1. Check `.env.local` exists
2. Restart the dev server after adding environment variables
3. Check browser console for initialization errors

## 📝 Current Configuration

The medical agent is configured with:
- **AI Model:** GPT-3.5 Turbo
- **Voice:** PlayHT - Jennifer (female, friendly voice)
- **Personality:** Friendly general physician
- **First Message:** "Hello! I'm Dr. AI. How are you feeling today?"

## 🎨 Features

- ✅ Voice conversation with AI doctor
- ✅ Real-time audio streaming
- ✅ Call status indicators
- ✅ Conversation history
- ✅ Error handling and recovery
- ✅ Microphone permission management

## 💡 Next Steps

1. Get your VAPI public key
2. Configure OpenAI credentials in Vapi dashboard
3. Add the key to `.env.local`
4. Restart the dev server
5. Test the voice agent!

## 📞 Need Help?

Check the browser console (F12) for detailed error messages. The logs will show:
- Environment check status
- Call connection progress
- Audio volume levels
- Any configuration issues

