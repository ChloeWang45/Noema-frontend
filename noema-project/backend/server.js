import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'Noema API is running',
    timestamp: new Date().toISOString()
  });
});

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length < 3) {
      return res.status(400).json({
        error: 'Please provide at least 3 notes for analysis',
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OpenAI API key is not configured',
      });
    }

    // Refined prompt - clearer distinction between user and AI notes
    const prompt = `Hey! I need your help organizing these thoughts and finding connections I might have missed.

CRITICAL REQUIREMENT: You MUST include EVERY SINGLE user note I provide below in your response. Do not leave any out.

Here's what I need:

1. GROUP ALL NOTES: Put them into 2-4 themes. Be specific and concrete. EVERY SINGLE NOTE from my list below must appear in exactly one theme with "aiGenerated": false.

2. GENERATE NEW AI NOTES: For each theme, create 2-3 NEW notes that:
   - Reveal connections between MY specific notes (reference them by content!)
   - Offer fresh perspectives I haven't considered
   - Show patterns or relationships I might have missed
   - Are genuinely insightful and thought-provoking
   - Focus on "what if" connections and deeper meanings
   - These should be marked with "aiGenerated": true

3. CREATE INSIGHTS: Give me 2-4 insights that connect different themes. These should be:
   - Unexpected connections that spark new thinking
   - Synthesis of ideas across themes
   - "Aha!" moments that help creativity and brainstorming
   - Focused on relationships between ideas
   - Useful for research, writing, ideating, or creative work

My notes (you must include ALL of these with "aiGenerated": false):
${notes.map((note, i) => `${i + 1}. ${note}`).join('\n')}

Respond with JSON in this EXACT format:
{
  "themes": [
    {
      "name": "Specific Theme Name",
      "insight": "Quick insight about this theme (1-2 sentences)",
      "notes": [
        { "text": "EXACT TEXT from user note above", "aiGenerated": false },
        { "text": "EXACT TEXT from another user note", "aiGenerated": false },
        { "text": "Your NEW AI-generated insight - connect specific notes from this theme. Like 'Your note about [X] and [Y] reveals an interesting pattern: [insight]. This connects to [Z] because [connection].' 40-90 words.", "aiGenerated": true },
        { "text": "Another NEW AI insight revealing hidden connections", "aiGenerated": true }
      ]
    }
  ],
  "insights": [
    {
      "title": "Clear Connection Title",
      "description": "Explain how these themes connect with specific examples from notes. Show the relationship, pattern, or synthesis.",
      "connectedThemes": ["Theme Name 1", "Theme Name 2"]
    }
  ]
}

CRITICAL RULES:
- Use EXACT text from my notes (copy-paste, don't modify)
- EVERY user note must appear with "aiGenerated": false
- Only YOUR new notes should have "aiGenerated": true
- Don't mix up user notes with AI notes
- Use proper spelling and grammar
- Be conversational but professional
- AI notes should reveal connections, not give tasks
- 40-90 words per AI note
- Help me see my ideas in a new way`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using the latest fast model
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant who excels at finding connections between ideas and revealing insights. You communicate in a friendly, conversational way - like a smart friend - but you use proper spelling and grammar. You focus on revealing patterns, connections, and fresh perspectives that help with creative thinking, brainstorming, and research. You avoid giving task lists and instead offer thought-provoking insights. You always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content);

    // Validate the response structure
    if (!result.themes || !result.insights) {
      throw new Error('Invalid response structure from OpenAI');
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    
    if (error.response?.status === 401) {
      res.status(401).json({
        error: 'Invalid OpenAI API key. Please check your configuration.',
      });
    } else if (error.response?.status === 429) {
      res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.',
      });
    } else {
      res.status(500).json({
        error: 'Failed to analyze notes. Please try again.',
        details: error.message,
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Noema API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? '✓ Configured' : '✗ Missing'}`);
});
