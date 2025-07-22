import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getApiUrl } from '../../utils/apiConfig';

type Data = {
  success: boolean;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { user, title, content } = req.body;

    // Validate required fields
    if (!user || !title || !content) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }

    // Forward the request to the backend API
    const response = await axios.post(getApiUrl('/api/updates'), {
      user,
      title,
      content
    });

    // Return the response from the backend
    return res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Error posting update:', error.response?.data || error.message);
    return res.status(500).json({ 
      success: false, 
      error: error.response?.data?.msg || 'Failed to post update' 
    });
  }
}