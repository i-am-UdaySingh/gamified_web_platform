import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Leaf, 
  FileText, 
  BarChart3, 
  ArrowUpRight, 
  ArrowRight,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';

/**
 * MOCK DATA & ASSETS
 * ------------------------------------------------------------------
 */
const MOCK_DATA = {
  totalParticipation: "50,000",
  registeredSchools: 120,
  avgEcoScore: 78,
  monthlyGrowth: [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 55 },
    { month: 'Apr', value: 60 },
    { month: 'May', value: 78 },
    { month: 'Jun', value: 85 },
  ]
};

/**
 * REUSABLE UI COMPONENTS
 * ------------------------------------------------------------------
 */

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type] || styles.neutral}`}>
      {children}
    </span>
  );
};

// A custom, lightweight SVG Line Chart component
const TrendChart = ({ data, color = "#059669" }) => {
  const height = 60;
  const width = 120;
  const max = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.value / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Area under curve */}
      <polyline
        fill={color}
        fillOpacity="0.1"
        stroke="none"
        points={`${points} ${width},${height} 0,${height}`}
      />
    </svg>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, data }) => (
  <Card className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
        <Icon className="w-5 h-5 text-slate-600" />
      </div>
      {trend && (
        <Badge type="success">
          <span className="flex items-center gap-1">
            +{trend}% <ArrowUpRight className="w-3 h-3" />
          </span>
        </Badge>
      )}
    </div>
    <div className="flex justify-between items-end">
      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
      {data && <TrendChart data={data} />}
    </div>
  </Card>
);

const ActionButton = ({ icon: Icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full text-left group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all duration-200 flex items-center gap-4"
  >
    <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-slate-900 group-hover:text-blue-700">{title}</h4>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
  </button>
);

/**
 * MAIN DASHBOARD VIEW
 * ------------------------------------------------------------------
 */
const DashboardView = ({ navigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            EcoQuest Government Dashboard
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            View state-wide engagement metrics, completed challenges, and student progress from the EcoQuest gamified platform.
          </p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
            Download PDF
           </button>
           <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            Export Data
           </button>
        </div>
      </div>

      {/* KPI Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Regional Impact Overview</h2>
          <span className="text-sm text-slate-400">Last updated: Just now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Participation" 
            value={MOCK_DATA.totalParticipation} 
            icon={Users}
            trend={12.5}
            data={MOCK_DATA.monthlyGrowth}
          />
          <StatCard 
            title="Schools Registered" 
            value={MOCK_DATA.registeredSchools} 
            icon={Building2} 
            trend={4.2}
            data={[...MOCK_DATA.monthlyGrowth].reverse()} // Just for visual variety
          />
          <StatCard 
            title="Avg. Eco-Score" 
            value={`${MOCK_DATA.avgEcoScore}%`} 
            icon={Leaf}
            trend={1.8}
            data={MOCK_DATA.monthlyGrowth}
          />
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Reporting & Policy Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionButton 
            onClick={() => navigate('schools')}
            icon={BarChart3}
            title="School Performance"
            description="Detailed analytics on curriculum adoption and student engagement."
          />
          <ActionButton 
            onClick={() => navigate('ngo')}
            icon={Users}
            title="NGO Collaboration"
            description="Track partnership metrics and funding allocation across regions."
          />
          <ActionButton 
            onClick={() => navigate('policy')}
            icon={FileText}
            title="Generate Policy Report"
            description="AI-assisted summary of environmental impact for legislative review."
          />
        </div>
      </section>
    </div>
  );
};

/**
 * PLACEHOLDER PAGE (For Simulation)
 * ------------------------------------------------------------------
 */
const PlaceholderPage = ({ title, onBack }) => (
  <div className="max-w-4xl mx-auto py-12 text-center animate-in fade-in zoom-in-95 duration-300">
    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <FileText className="w-10 h-10 text-slate-400" />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500 mb-8">This module is currently under active development.</p>
    <button 
      onClick={onBack}
      className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
    >
      Return to Dashboard
    </button>
  </div>
);

/**
 * MAIN APP SHELL
 * ------------------------------------------------------------------
 */
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Router Logic Simulation
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardView navigate={setActiveTab} />;
      case 'schools': return <PlaceholderPage title="School Performance Reports" onBack={() => setActiveTab('dashboard')} />;
      case 'ngo': return <PlaceholderPage title="NGO Collaboration Data" onBack={() => setActiveTab('dashboard')} />;
      case 'policy': return <PlaceholderPage title="Policy Generation Engine" onBack={() => setActiveTab('dashboard')} />;
      default: return <DashboardView navigate={setActiveTab} />;
    }
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        activeTab === id 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-xl">
            {/* Replaced Image with reliable Icon Component */}
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <span className="text-emerald-900">EcoQuest</span>
          </div>
        </div>
        
        <div className="p-4 space-y-1 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Overview</div>
          <NavItem id="dashboard" label="Dashboard" icon={BarChart3} />
          <NavItem id="schools" label="Schools" icon={Building2} />
          <NavItem id="ngo" label="NGO Partners" icon={Users} />
          
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-8">Analysis</div>
          <NavItem id="policy" label="Policy Reports" icon={FileText} />
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
              GO
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">Gov. Official</p>
              <p className="text-xs text-slate-500 truncate">admin@state.gov</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-3 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2 font-bold text-slate-900">
             {/* Replaced Image with reliable Icon Component */}
             <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <span className="text-emerald-900">EcoQuest</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 absolute top-16 left-0 right-0 z-20 shadow-xl">
             <NavItem id="dashboard" label="Dashboard" icon={BarChart3} />
             <NavItem id="schools" label="Schools" icon={Building2} />
             <NavItem id="ngo" label="NGO Partners" icon={Users} />
             <NavItem id="policy" label="Policy Reports" icon={FileText} />
          </div>
        )}

        {/* Desktop Topbar */}
        <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-4 items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search schools, regions, or metrics..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;