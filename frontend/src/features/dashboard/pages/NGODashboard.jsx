import React, { useState } from 'react';
import { 
  Globe, 
  Users, 
  Leaf, 
  PlusCircle, 
  School, 
  FileCheck, 
  LayoutDashboard,
  ArrowLeft,
  BarChart3,
  Megaphone
} from 'lucide-react';

// --- Components ---

const StatCard = ({ icon: Icon, title, value, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
    <p className="text-3xl font-bold text-slate-800">{value}</p>
  </div>
);

const ActionCard = ({ icon: Icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-start p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 w-full text-left group"
  >
    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      <Icon size={28} />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm">{description}</p>
  </button>
);

const PlaceholderPage = ({ title, onBack }) => (
  <div className="p-8 max-w-6xl mx-auto">
    <button 
      onClick={onBack}
      className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
    >
      <ArrowLeft size={20} className="mr-2" />
      Back to Dashboard
    </button>
    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center">
      <div className="inline-flex p-4 rounded-full bg-slate-100 mb-6 text-slate-400">
        <LayoutDashboard size={48} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500">This feature is currently under development.</p>
    </div>
  </div>
);

// --- Main Dashboard Component ---

const NGODashboard = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-8 overflow-hidden text-white shadow-lg">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Globe size={180} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-3 py-1 bg-emerald-700/50 rounded-full text-xs font-medium border border-emerald-600/50">
              Organization Admin
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">NGO Impact Dashboard</h1>
          <p className="text-emerald-100 max-w-2xl text-lg">
            Coordinate campaigns, track community outreach, and measure your environmental impact in real-time.
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            <BarChart3 className="mr-2 text-emerald-600" size={24} />
            Campaign Overview
          </h2>
          <span className="text-sm text-slate-500">Last updated: Just now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Active Campaigns" 
            value="3" 
            icon={Megaphone}
            colorClass="bg-blue-50 text-blue-600"
          />
          <StatCard 
            title="Participants Engaged" 
            value="3,200" 
            icon={Users}
            colorClass="bg-orange-50 text-orange-600"
          />
          <StatCard 
            title="Impact Units Saved" 
            value="10k" 
            icon={Leaf}
            colorClass="bg-emerald-50 text-emerald-600"
          />
        </div>
      </section>

      {/* Actions Section */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <LayoutDashboard className="mr-2 text-emerald-600" size={24} />
          Action Center
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard 
            icon={PlusCircle}
            title="Create New Campaign"
            description="Launch a new initiative, set goals, and invite schools."
            onClick={() => onNavigate('create-campaign')}
          />
          <ActionCard 
            icon={School}
            title="School Partner Data"
            description="Analyze performance and engagement across partner schools."
            onClick={() => onNavigate('school-data')}
          />
          <ActionCard 
            icon={FileCheck}
            title="Review Submissions"
            description="Validate impact claims and approve challenge completions."
            onClick={() => onNavigate('review-submissions')}
          />
        </div>
      </section>
    </div>
  );
};

// --- Main App Container ---

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <NGODashboard onNavigate={setCurrentView} />;
      case 'create-campaign':
        return <PlaceholderPage title="Create New Campaign" onBack={() => setCurrentView('dashboard')} />;
      case 'school-data':
        return <PlaceholderPage title="School Partner Data" onBack={() => setCurrentView('dashboard')} />;
      case 'review-submissions':
        return <PlaceholderPage title="Review Submissions" onBack={() => setCurrentView('dashboard')} />;
      default:
        return <NGODashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <Leaf className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">EcoQuest</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Help</button>
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm border border-emerald-200">
              OA
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;