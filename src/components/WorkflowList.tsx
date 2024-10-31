import React from 'react';
import { Play, Pause, Edit, Trash2, Plus } from 'lucide-react';

interface WorkflowListProps {
  onCreateWorkflow: () => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({ onCreateWorkflow }) => {
  const workflows = [
    {
      id: 1,
      name: 'Forward Invoices',
      description: 'Automatically forward invoice emails to accounting',
      active: true,
    },
    {
      id: 2,
      name: 'AI Summary',
      description: 'Generate summaries for long emails',
      active: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Workflows</h2>
        <button
          onClick={onCreateWorkflow}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl hover:from-pink-600 hover:to-violet-600 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Workflow
        </button>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                <p className="text-gray-600">{workflow.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  {workflow.active ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowList;