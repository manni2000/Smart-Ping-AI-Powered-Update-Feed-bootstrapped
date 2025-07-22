import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  success: boolean;
  summary?: string;
  updateCount?: number;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Get summary from backend API (now using OpenRouter)
    const response = await axios.get('http://localhost:5000/api/summary');
    
    // Return the summary data
    return res.status(200).json({ 
      success: true, 
      summary: response.data.summary,
      updateCount: response.data.updateCount
    });
  } catch (error: any) {
    console.error('Error fetching summary:', error.response?.data || error.message);
    
    // If no updates found, return a specific message
    if (error.response?.status === 404) {
      return res.status(404).json({ 
        success: false, 
        error: 'No updates available for summary in the last 24 hours' 
      });
    }
    
    // Return general error
    return res.status(500).json({ 
      success: false, 
      error: error.response?.data?.msg || 'Failed to fetch summary' 
    });
  }
}