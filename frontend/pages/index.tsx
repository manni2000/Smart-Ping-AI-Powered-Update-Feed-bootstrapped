import { useState, useEffect } from 'react';
import axios from 'axios';
import format from 'date-fns/format/index.js';
import { FaSpinner, FaPlus, FaMinus } from 'react-icons/fa';
import UpdateItem from '../components/UpdateItem';
import SearchBar from '../components/SearchBar';
import UpdateForm from '../components/UpdateForm';
import { getApiUrl } from '../utils/apiConfig';

// Types
interface Update {
  _id: string;
  user: string;
  title: string;
  content: string;
  timestamp: string;
}

interface Summary {
  summary: string;
  updateCount: number;
}

export default function Home() {
  // State
  const [updates, setUpdates] = useState<Update[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [formData, setFormData] = useState({
    user: '',
    title: '',
    content: ''
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Fetch updates on component mount
  useEffect(() => {
    fetchUpdates();
    fetchSummary();
  }, []);

  // Fetch all updates
  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(getApiUrl('/api/updates'));
      setUpdates(res.data);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch AI summary
  const fetchSummary = async () => {
    setSummaryLoading(true);
    try {
      const res = await axios.get(getApiUrl('/api/summary'));
      setSummary(res.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary(null);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (data: { user: string; title: string; content: string }) => {
    if (!data.user || !data.title || !data.content) {
      alert('Please fill in all fields');
      return;
    }
    
    setFormSubmitting(true);
    try {
      await axios.post(getApiUrl('/api/updates'), data);
      setShowForm(false);
      fetchUpdates();
      fetchSummary();
    } catch (error) {
      console.error('Error creating update:', error);
      alert('Failed to create update. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Handle update edit
  const handleEdit = async (id: string, data: { user: string; title: string; content: string }) => {
    if (!data.user || !data.title || !data.content) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await axios.put(getApiUrl(`/api/updates/${id}`), data);
      fetchUpdates();
      fetchSummary();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle update delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(getApiUrl(`/api/updates/${id}`));
      fetchUpdates();
      fetchSummary();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (term: string) => {
    if (!term) {
      fetchUpdates();
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.get(getApiUrl(`/api/updates/search?keyword=${term}`));
      setUpdates(res.data);
    } catch (error) {
      console.error('Error searching updates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Daily Summary Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg mb-8 border-l-4 border-indigo-500 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">Daily Summary</h2>
          {summaryLoading ? (
            <div className="flex justify-center py-4">
              <FaSpinner className="animate-spin text-indigo-500 text-xl" />
            </div>
          ) : summary ? (
            <div>
              <p className="mb-2 text-gray-800">{summary.summary}</p>
              <p className="text-sm text-gray-600">Based on {summary.updateCount} updates from the last 24 hours (Powered by OpenRouter)</p>
            </div>
          ) : (
            <p className="text-gray-600 italic">No updates available for summary in the last 24 hours.</p>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Find Updates
            </h2>
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              onSearch={handleSearch}
              placeholder="Search updates by title, content or user..."
              debounceTime={500}
            />
          </div>
        </div>
        
        {/* Post Update Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center w-full md:w-auto px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md font-medium"
          >
            {showForm ? (
              <>
                <FaMinus className="mr-2" /> Hide Update Form
              </>
            ) : (
              <>
                <FaPlus className="mr-2" /> Post New Update
              </>
            )}
          </button>
        </div>
        
        {/* Post Update Form */}
        {showForm && (
          <div className="mb-8 transition-all duration-300 ease-in-out transform">
            <UpdateForm onSubmit={handleSubmit} isLoading={formSubmitting} />
          </div>
        )}
        
        {/* Updates Feed */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Updates Feed
          </h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <FaSpinner className="animate-spin text-blue-500 text-2xl" />
            </div>
          ) : updates.length > 0 ? (
            <div className="space-y-4">
              {updates.map((update) => (
                <UpdateItem
                  key={update._id}
                  id={update._id}
                  user={update.user}
                  title={update.title}
                  content={update.content}
                  timestamp={update.timestamp}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">No updates found.</p>
              {searchTerm && (
                <p className="text-sm">
                  Try adjusting your search or 
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      fetchUpdates();
                    }}
                    className="text-blue-500 hover:text-blue-700 ml-1"
                  >
                    clear the search
                  </button>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}