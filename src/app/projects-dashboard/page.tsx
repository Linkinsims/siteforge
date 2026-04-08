import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import KPIBentoGrid from './components/KPIBentoGrid';
import ProjectsTable from './components/ProjectsTable';
import PendingApprovalsPanel from './components/PendingApprovalsPanel';
import ActivityFeed from './components/ActivityFeed';

export default function ProjectsDashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <DashboardHeader />
        <div className="flex-1 overflow-auto">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 space-y-6">
            <KPIBentoGrid />
            <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              <div className="xl:col-span-2 2xl:col-span-3">
                <ProjectsTable />
              </div>
              <div className="xl:col-span-1 2xl:col-span-1 space-y-5">
                <PendingApprovalsPanel />
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}