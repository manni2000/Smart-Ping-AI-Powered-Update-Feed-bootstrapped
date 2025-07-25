import React, { useState } from 'react';
import Button from './Button';
import { FaUser, FaHeading, FaEdit } from 'react-icons/fa';

interface FormData {
  user: string;
  title: string;
  content: string;
}

interface UpdateFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<FormData>({
    user: '',
    title: '',
    content: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ user: '', title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b pb-2 sm:pb-3 mb-3 sm:mb-4">Post an Update</h3>
      
      <div className="space-y-1 sm:space-y-2">
        <label htmlFor="user" className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
          <FaUser className="text-blue-500 h-3 w-3 sm:h-4 sm:w-4" /> Your Name
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 text-gray-700"
          />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
          <FaHeading className="text-blue-500 h-3 w-3 sm:h-4 sm:w-4" /> Update Title
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter a descriptive title"
            className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 text-gray-700"
          />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <label htmlFor="content" className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
          <FaEdit className="text-blue-500 h-3 w-3 sm:h-4 sm:w-4" /> Update Content
        </label>
        <div className="relative rounded-md shadow-sm">
          <textarea
            id="content"
            name="content"
            rows={4}
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Share your update details here..."
            className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 text-gray-700 resize-vertical"
          />
        </div>
      </div>

      <div className="pt-1 sm:pt-2">
        <Button type="submit" isLoading={isLoading} size="lg" className="w-full">
          Submit Update
        </Button>
      </div>
    </form>
  );
};

export default UpdateForm;