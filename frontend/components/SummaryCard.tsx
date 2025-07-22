import React from 'react';
import Card from './Card';
import Button from './Button';

interface SummaryCardProps {
  summary: string;
  updateCount: number;
  isLoading?: boolean;
  onRefresh: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  summary,
  updateCount,
  isLoading = false,
  onRefresh,
}) => {
  return (
    <Card title="Daily Summary" className="mb-6 border-l-4 border-l-blue-500">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Based on {updateCount} update{updateCount !== 1 ? 's' : ''} (Powered by OpenRouter)
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={onRefresh}
            isLoading={isLoading}
          >
            Refresh Summary
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          {isLoading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-line">{summary}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;