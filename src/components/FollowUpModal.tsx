import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

interface FollowUpModalProps {
  onClose: () => void;
  onSetFollowUp: (date: Date) => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ onClose, onSetFollowUp }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [timeOption, setTimeOption] = useState<'1d' | '3d' | '1w' | 'custom'>('3d');

  const handleTimeOptionChange = (option: '1d' | '3d' | '1w' | 'custom') => {
    setTimeOption(option);
    const newDate = new Date();
    switch (option) {
      case '1d':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case '3d':
        newDate.setDate(newDate.getDate() + 3);
        break;
      case '1w':
        newDate.setDate(newDate.getDate() + 7);
        break;
      default:
        return;
    }
    setDate(newDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetFollowUp(date);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Set Follow-up Reminder</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Follow-up in
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: '1d', label: '1 Day' },
                { value: '3d', label: '3 Days' },
                { value: '1w', label: '1 Week' },
                { value: 'custom', label: 'Custom' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTimeOptionChange(option.value as any)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    timeOption === option.value
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {timeOption === 'custom' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Date
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={date.toISOString().split('T')[0]}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative flex-1">
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    value={date.toTimeString().slice(0, 5)}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(date);
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      setDate(newDate);
                    }}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Set Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FollowUpModal;