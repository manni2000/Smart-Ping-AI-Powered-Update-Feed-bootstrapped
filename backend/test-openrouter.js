// Test file for OpenRouter integration
const { generateResponse } = require('./utils/openRouterClient');

async function testOpenRouter() {
  try {
    console.log('Testing OpenRouter API...');
    
    // Test prompt
    const prompt = 'What is the meaning of life?';
    console.log(`Sending prompt: "${prompt}"`);
    
    // Generate response
    const response = await generateResponse(prompt);
    
    console.log('\nResponse from OpenRouter:');
    console.log(response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the test
testOpenRouter();