# Smart Ping Backend

This is the backend API for the Smart Ping project, built with Express.js and MongoDB.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, set up your environment variables by creating a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

Run the development server:

```bash
npm run dev
```

The server will be running at [http://localhost:5000](http://localhost:5000).

## Features

- Express.js for the API server
- MongoDB for data storage
- OpenRouter integration for AI-powered summaries
- RESTful API endpoints for updates management

## Project Structure

- `models/`: MongoDB schema definitions
- `routes/`: API route handlers
- `utils/`: Utility functions and services
- `server.js`: Main application entry point

## API Endpoints

- `GET /api/updates` - Get all updates
- `GET /api/updates/:id` - Get a specific update
- `POST /api/updates` - Create a new update
- `PUT /api/updates/:id` - Update an existing update
- `DELETE /api/updates/:id` - Delete an update
- `GET /api/updates/search` - Search updates by keyword
- `GET /api/summary` - Get AI-generated summary of recent updates

## Environment Configuration

The application uses environment variables to handle different environments:

- `PORT`: The port number for the server (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `OPENROUTER_API_KEY`: API key for OpenRouter
- `OPENROUTER_BASE_URL`: Base URL for OpenRouter API

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for the deployment.

For more details on the OpenRouter integration, see [README-OpenRouter.md](./README-OpenRouter.md).