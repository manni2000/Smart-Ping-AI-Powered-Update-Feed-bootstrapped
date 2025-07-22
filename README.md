# Smart Ping - AI-Powered Update Feed for Teams

A simple AI-enhanced platform where users can post updates (like standups, task progress, or daily logs), and the system summarizes them into a daily digest for team-wide visibility.

## Core Features

- **Post Update**: Basic form to enter text-based update (title + content)
- **AI Summary**: AI generates daily summary (1-paragraph) from all updates using OpenRouter AI models
- **View Feed**: Lists all updates chronologically with timestamps
- **Search**: Simple keyword search for past updates
- **MongoDB**: Stores updates with user, content, timestamp
- **Next.js UI**: Minimal, mobile-responsive feed + input form UI
- **Node.js API**: RESTful backend handling CRUD and AI summary endpoint

## Project Structure

```
/smart-ping
  /frontend (Next.js)
    /pages
      index.tsx         -> Update input + feed
      /api
        post.ts         -> POST update
        summary.ts      -> GET daily summary
  /backend (Node.js + Express)
    /routes
      updates.js        -> CRUD APIs
      summary.js        -> AI summary generator
    /models
      Update.js         -> Mongoose schema
    server.js
```

## AI Usage

Daily Digest Generator endpoint `/summary` fetches last 24h posts, generates a single digest using AI:

- GET `/api/summary` → OpenRouter AI summarizer using advanced language models

## Data Model (updates collection)

```json
{
  "user": "Manish",
  "title": "UI Fixes",
  "content": "Completed UI fixes for dashboard, started working on backend APIs.",
  "timestamp": "2025-07-22T12:45:00Z"
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- OpenRouter API key

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
   - Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/smart-ping
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   ```

4. Run the development servers

```bash
# Run backend server
cd backend
npm run dev

# In a separate terminal, run frontend server
cd frontend
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Backend

- `GET /api/updates` - Get all updates
- `GET /api/updates/search?keyword=value` - Search updates by keyword
- `POST /api/updates` - Create a new update
- `GET /api/updates/:id` - Get update by ID
- `DELETE /api/updates/:id` - Delete an update
- `GET /api/summary` - Get AI-generated summary of updates from the last 24 hours

### Frontend

- `POST /api/post` - Create a new update
- `GET /api/summary` - Get AI-generated summary
