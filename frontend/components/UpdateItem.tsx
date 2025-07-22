import React, { useState } from 'react';
import format from 'date-fns/format/index.js';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

interface UpdateItemProps {
  id: string;
  user: string;
  title: string;
  content: string;
  timestamp: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, data: { user: string; title: string; content: string }) => void;
}

const UpdateItem: React.FC<UpdateItemProps> = ({
  id,
  user,
  title,
  content,
  timestamp,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState({
    user,
    title,
    content
  });
  
  const formattedDate = format(new Date(timestamp), 'MMM d, yyyy h:mm a');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({ user, title, content });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="border rounded-lg shadow-sm p-3 sm:p-4 mb-3 sm:mb-4 bg-white hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {isEditing ? (
        <div className="space-y-2 sm:space-y-3">
          <div>
            <label htmlFor={`title-${id}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id={`title-${id}`}
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor={`user-${id}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id={`user-${id}`}
              name="user"
              value={editData.user}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor={`content-${id}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id={`content-${id}`}
              name="content"
              value={editData.content}
              onChange={handleChange}
              rows={4}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 pt-1">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto inline-flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaSave className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="w-full sm:w-auto inline-flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 text-xs sm:text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaTimes className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex space-x-1 sm:space-x-2">
              {onEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
                  aria-label="Edit update"
                >
                  <FaEdit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDeleteClick}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                  aria-label="Delete update"
                >
                  <FaTrash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
            Posted by {user} on {formattedDate}
          </p>
          <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">{content}</p>
          
          {showDeleteConfirm && (
            <div className="mt-2 sm:mt-3 p-2 sm:p-3 border border-red-200 rounded-md bg-red-50">
              <p className="text-xs sm:text-sm text-red-700 mb-1 sm:mb-2">Are you sure you want to delete this update?</p>
              <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
                <button
                  onClick={confirmDelete}
                  className="w-full sm:w-auto px-2 sm:px-3 py-1 bg-red-600 text-white text-xs sm:text-sm rounded-md hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="w-full sm:w-auto px-2 sm:px-3 py-1 bg-gray-200 text-gray-800 text-xs sm:text-sm rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateItem;