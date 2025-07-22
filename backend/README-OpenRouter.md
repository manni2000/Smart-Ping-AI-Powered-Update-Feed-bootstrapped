# OpenRouter Integration for Smart Ping

This document explains how to use the OpenRouter API integration in the Smart Ping application.

## Overview

OpenRouter provides access to various AI models through a unified API. This integration allows Smart Ping to use models like Qwen 3 for generating summaries and other AI-powered features.

## Setup

1. Make sure you have the required environment variables in your `.env` file:

```
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

2. Install the required dependencies:

```bash
npm install
```

## Testing the Integration

You can test the OpenRouter integration by running:

```bash
node test-openrouter.js
```

This will send a test prompt to the OpenRouter API and display the response.

## API Endpoints

### OpenRouter Summary

- `GET /api/openrouter-summary` - Get AI-generated summary of updates from the last 24 hours using OpenRouter

## Usage in Code

You can use the OpenRouter client in your code as follows:

```javascript
const { generateResponse } = require('./utils/openRouterClient');

async function example() {
  try {
    const prompt = 'Your prompt here';
    const response = await generateResponse(prompt);
    console.log(response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Available Models

By default, the integration uses the `qwen/qwen3-235b-a22b-07-25:free` model, but you can specify a different model when calling the `generateResponse` function:

```javascript
const response = await generateResponse(prompt, 'different/model');
```

Refer to the [OpenRouter documentation](https://openrouter.ai/docs) for a list of available models.