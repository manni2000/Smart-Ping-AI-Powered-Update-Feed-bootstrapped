import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-3 py-3 sm:px-4 sm:py-5 md:px-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-medium leading-6 text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-3 py-3 sm:px-4 sm:py-5 md:p-6">{children}</div>
    </div>
  );
};

export default Card;