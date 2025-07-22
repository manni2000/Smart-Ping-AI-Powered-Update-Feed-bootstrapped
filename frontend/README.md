# Smart Ping Frontend

This is the frontend application for the Smart Ping project, built with Next.js and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, set up your environment variables:

- For local development, create a `.env.local` file with:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```

- For production, the environment variables are set in Vercel dashboard or in `.env.production`

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Next.js for server-side rendering and static site generation
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code linting

## Project Structure

- `pages/`: Contains all the pages of the application
- `components/`: Reusable React components
- `styles/`: Global styles and Tailwind CSS configuration
- `public/`: Static assets like images and fonts
- `utils/`: Utility functions and custom hooks

## Environment Configuration

The application uses environment variables to handle different environments:

- `NEXT_PUBLIC_API_URL`: The base URL for the backend API
  - Local development: http://localhost:5000
  - Production: https://smart-ping-backend.vercel.app

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for the deployment.