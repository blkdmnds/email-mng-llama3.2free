import React, { useState } from 'react';
import Header from '../components/Header';
import WorkflowList from '../components/WorkflowList';
import WorkflowBuilder from '../components/WorkflowBuilder';

const WorkflowsPage = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  const handleSaveWorkflow = (workflow: any) => {
    console.log('Saving workflow:', workflow);
    // Implement workflow saving logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WorkflowList onCreateWorkflow={() => setShowBuilder(true)} />
        </div>
      </main>

      {showBuilder && (
        <WorkflowBuilder
          onClose={() => setShowBuilder(false)}
          onSave={handleSaveWorkflow}
        />
      )}
    </div>
  );
};

export default WorkflowsPage;