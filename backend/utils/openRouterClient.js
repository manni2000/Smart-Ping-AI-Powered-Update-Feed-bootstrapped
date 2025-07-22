const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI client with OpenRouter configuration
const client = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Generate a response using OpenRouter API
 * @param {string} prompt - The user prompt to send to the model
 * @param {string} model - The model to use (defaults to qwen/qwen3-235b-a22b-07-25:free)
 * @returns {Promise<string>} - The generated response
 */
async function generateResponse(prompt, model = 'qwen/qwen3-235b-a22b-07-25:free') {
  try {
    const completion = await client.chat.completions.create({
      extra_headers: {
        'HTTP-Referer': 'https://smart-ping-app.com', // Replace with your actual site URL
        'X-Title': 'Smart Ping', // Replace with your actual site name
      },
      extra_body: {},
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw new Error('Failed to generate response from OpenRouter');
  }
}

module.exports = { generateResponse };