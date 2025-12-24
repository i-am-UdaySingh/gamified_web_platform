import React, { useState } from 'react';

/**
 * INTERNAL ICONS (No external libraries needed)
 * ------------------------------------------------------------------
 */
const Icons = {
  Leaf: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  Building: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  ),
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>
    </svg>
  ),
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  )
};

/**
 * MOCK DATA (INDIAN CONTEXT)
 * ------------------------------------------------------------------
 */

const SCHOOLS_DATA = [
  { id: 1, name: "The Doon School", region: "Dehradun, UK", students: 520, ecoScore: 92, status: "Gold" },
  { id: 2, name: "Woodstock School", region: "Mussoorie, UK", students: 450, ecoScore: 88, status: "Silver" },
  { id: 3, name: "Delhi Public School", region: "R.K. Puram, Delhi", students: 2500, ecoScore: 85, status: "Silver" },
  { id: 4, name: "Kendriya Vidyalaya IIT", region: "Powai, Mumbai", students: 1200, ecoScore: 79, status: "Bronze" },
  { id: 5, name: "Mayo College", region: "Ajmer, Rajasthan", students: 750, ecoScore: 95, status: "Gold" },
  { id: 6, name: "St. Stephen's School", region: "Chandigarh", students: 1800, ecoScore: 72, status: "Bronze" },
];

const NGO_DATA = [
  { id: 1, name: "Chintan Environmental", focus: "Waste Management", impact: "High", region: "North India" },
  { id: 2, name: "Green Yatra", focus: "Tree Plantation", impact: "Very High", region: "Pan India" },
  { id: 3, name: "Vatavaran", focus: "Water Conservation", impact: "Medium", region: "Bangalore" },
  { id: 4, name: "SankalpTaru", focus: "Reforestation", impact: "High", region: "Himalayas" },
  { id: 5, name: "Swechha", focus: "Youth Education", impact: "Medium", region: "Delhi NCR" },
];

const REPORTS_DATA = [
  { id: 1, title: "Q3 2024 Environmental Impact Assessment", type: "PDF", size: "2.4 MB" },
  { id: 2, title: "Student Engagement Analysis - North Zone", type: "PDF", size: "1.8 MB" },
  { id: 3, title: "NGO Fund Utilization Report 2024", type: "PDF", size: "3.1 MB" },
  { id: 4, title: "Policy Recommendation: Urban Greening", type: "PDF", size: "5.2 MB" },
];

/**
 * STYLES (Injected directly)
 * ------------------------------------------------------------------
 */
const styles = `
  .eq-container { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; color: #0f172a; }
  .eq-sidebar { width: 260px; background: white; border-right: 1px solid #e2e8f0; position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; }
  .eq-logo-area { padding: 24px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 20px; color: #064e3b; }
  .eq-logo-icon { width: 32px; height: 32px; background: #d1fae5; color: #059669; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .eq-nav { padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .eq-nav-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer; color: #64748b; border: none; background: none; width: 100%; font-size: 14px; font-weight: 500; transition: all 0.2s; }
  .eq-nav-item:hover { background: #f1f5f9; color: #0f172a; }
  .eq-nav-item.active { background: #eff6ff; color: #1d4ed8; }
  .eq-nav-item.logout { color: #ef4444; }
  .eq-nav-item.logout:hover { background: #fef2f2; color: #dc2626; }
  
  .eq-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .eq-header-mobile { display: none; padding: 16px; background: white; border-bottom: 1px solid #e2e8f0; align-items: center; justify-content: space-between; }
  
  .eq-content { padding: 32px; max-width: 1200px; margin: 0 auto; width: 100%; }
  
  .eq-title-section { margin-bottom: 32px; }
  .eq-title { font-size: 28px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; }
  .eq-subtitle { color: #64748b; font-size: 16px; margin: 0; max-width: 600px; line-height: 1.5; }
  
  .eq-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
  
  .eq-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .eq-stat-header { display: flex; justify-content: space-between; margin-bottom: 16px; }
  .eq-stat-icon { padding: 8px; background: #f8fafc; border-radius: 8px; color: #475569; }
  .eq-stat-label { font-size: 14px; font-weight: 500; color: #64748b; margin: 0 0 4px 0; }
  .eq-stat-value { font-size: 28px; font-weight: 700; color: #0f172a; margin: 0; }
  
  .eq-action-btn { width: 100%; text-align: left; display: flex; align-items: center; gap: 16px; padding: 20px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
  .eq-action-btn:hover { border-color: #3b82f6; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1); }
  .eq-action-icon { width: 48px; height: 48px; background: #eff6ff; color: #2563eb; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .eq-action-text h4 { margin: 0 0 4px 0; font-size: 16px; color: #0f172a; }
  .eq-action-text p { margin: 0; font-size: 13px; color: #64748b; }
  
  .eq-badge { padding: 4px 8px; background: #ecfdf5; color: #047857; border-radius: 99px; font-size: 12px; font-weight: 600; }
  
  /* Table Styles */
  .eq-table-container { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
  .eq-table { width: 100%; border-collapse: collapse; text-align: left; }
  .eq-th { padding: 16px 24px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #64748b; font-size: 13px; background: #f8fafc; text-transform: uppercase; letter-spacing: 0.05em; }
  .eq-td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 14px; }
  .eq-tr:last-child .eq-td { border-bottom: none; }
  .eq-tr:hover { background: #f8fafc; }
  
  .eq-status-gold { color: #b45309; background: #fffbeb; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid #fcd34d; }
  .eq-status-silver { color: #52525b; background: #f4f4f5; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid #e4e4e7; }
  .eq-status-bronze { color: #7c2d12; background: #ffedd5; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid #fed7aa; }

  @media (max-width: 1024px) {
    .eq-sidebar, .eq-header { display: none; }
    .eq-header-mobile { display: flex; }
    .eq-grid { grid-template-columns: 1fr; }
    .eq-content { padding: 16px; }
    .eq-table { display: block; overflow-x: auto; }
  }
`;

/**
 * COMPONENTS
 * ------------------------------------------------------------------
 */

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="eq-card">
    <div className="eq-stat-header">
      <div className="eq-stat-icon"><Icon /></div>
      {trend && <span className="eq-badge">+{trend}%</span>}
    </div>
    <div>
      <h3 className="eq-stat-label">{title}</h3>
      <p className="eq-stat-value">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ icon: Icon, title, description, onClick }) => (
  <button className="eq-action-btn" onClick={onClick}>
    <div className="eq-action-icon"><Icon /></div>
    <div className="eq-action-text" style={{ flex: 1 }}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
    <div style={{ color: '#cbd5e1' }}><Icons.ArrowRight /></div>
  </button>
);

/* --- Views --- */

const DashboardHome = ({ onNavigate }) => (
  <>
    <div className="eq-grid">
      <StatCard 
        title="Total Participation" 
        value="52,450" 
        icon={Icons.Users}
        trend={12.5}
      />
      <StatCard 
        title="Schools Registered" 
        value="120" 
        icon={Icons.Building} 
        trend={4.2}
      />
      <StatCard 
        title="Avg. Eco-Score" 
        value="78%" 
        icon={Icons.Leaf}
        trend={1.8}
      />
    </div>

    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1e293b' }}>
      Quick Actions
    </h2>
    
    <div className="eq-grid">
      <ActionButton 
        onClick={() => onNavigate('schools')}
        icon={Icons.Chart}
        title="School Performance"
        description="View analytics for Doon, Woodstock, etc."
      />
      <ActionButton 
        onClick={() => onNavigate('ngo')}
        icon={Icons.Users}
        title="NGO Collaboration"
        description="Track partnerships with Green Yatra, etc."
      />
      <ActionButton 
        onClick={() => onNavigate('policy')}
        icon={Icons.FileText}
        title="Generate Policy Report"
        description="AI-assisted summary for review."
      />
    </div>
  </>
);

const SchoolsView = () => (
  <div className="eq-table-container">
    <table className="eq-table">
      <thead>
        <tr>
          <th className="eq-th">School Name</th>
          <th className="eq-th">Region</th>
          <th className="eq-th">Students</th>
          <th className="eq-th">Eco-Score</th>
          <th className="eq-th">Status</th>
        </tr>
      </thead>
      <tbody>
        {SCHOOLS_DATA.map((school) => (
          <tr key={school.id} className="eq-tr">
            <td className="eq-td" style={{ fontWeight: 500 }}>{school.name}</td>
            <td className="eq-td">{school.region}</td>
            <td className="eq-td">{school.students.toLocaleString()}</td>
            <td className="eq-td">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${school.ecoScore}%`, height: '100%', background: school.ecoScore > 90 ? '#059669' : '#3b82f6' }} />
                </div>
                {school.ecoScore}%
              </div>
            </td>
            <td className="eq-td">
              <span className={`eq-status-${school.status.toLowerCase()}`}>{school.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const NGOView = () => (
  <div className="eq-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
    {NGO_DATA.map((ngo) => (
      <div key={ngo.id} className="eq-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#0f172a' }}>{ngo.name}</h3>
          <span className="eq-badge">{ngo.region}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px 0' }}>Focus Area</p>
            <p style={{ fontWeight: 500, margin: 0 }}>{ngo.focus}</p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px 0' }}>Impact Rating</p>
            <p style={{ fontWeight: 500, margin: 0, color: ngo.impact === 'Very High' ? '#059669' : '#334155' }}>{ngo.impact}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const PolicyView = () => (
  <div className="eq-card">
    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Generated Reports</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {REPORTS_DATA.map((report) => (
        <div key={report.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
              <Icons.FileText />
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontWeight: 500, color: '#0f172a' }}>{report.title}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{report.type} • {report.size}</p>
            </div>
          </div>
          <button style={{ padding: '8px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Icons.Download />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const GovernmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
      className={`eq-nav-item ${activeTab === id ? 'active' : ''}`}
    >
      <div style={{ width: 20 }}><Icon /></div>
      {label}
    </button>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardHome onNavigate={setActiveTab} />;
      case 'schools':
        return <SchoolsView />;
      case 'ngo':
        return <NGOView />;
      case 'policy':
        return <PolicyView />;
      default:
        return <DashboardHome onNavigate={setActiveTab} />;
    }
  };

  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'EcoQuest Government Dashboard';
      case 'schools': return 'School Performance & Analytics';
      case 'ngo': return 'NGO Partner Network';
      case 'policy': return 'Policy & Impact Reports';
      default: return 'Dashboard';
    }
  };

  const getSubtitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'View state-wide engagement metrics, completed challenges, and student progress.';
      case 'schools': return 'Detailed breakdown of top performing schools, participation rates, and eco-scores across regions.';
      case 'ngo': return 'Track collaboration impact, funding utilization, and regional focus areas of our partner organizations.';
      case 'policy': return 'Download AI-generated summaries and impact assessments for legislative review.';
      default: return '';
    }
  };

  return (
    <div className="eq-container">
      <style>{styles}</style>
      
      {/* Sidebar (Desktop) */}
      <aside className="eq-sidebar">
        <div className="eq-logo-area">
          <div className="eq-logo-icon">
            <Icons.Leaf />
          </div>
          EcoQuest
        </div>
        
        <div className="eq-nav">
          <NavItem id="dashboard" label="Dashboard" icon={Icons.Chart} />
          <NavItem id="schools" label="Schools" icon={Icons.Building} />
          <NavItem id="ngo" label="NGO Partners" icon={Icons.Users} />
          <NavItem id="policy" label="Policy Reports" icon={Icons.FileText} />
        </div>

        {/* Logout Section at bottom of sidebar */}
        <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9' }}>
           <button 
             className="eq-nav-item logout" 
             onClick={() => console.log('Logout clicked')} // Add your logout logic here
           >
              <div style={{ width: 20 }}><Icons.LogOut /></div>
              Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="eq-main">
        {/* Mobile Header */}
        <header className="eq-header-mobile">
          <div className="eq-logo-area" style={{ padding: 0, border: 'none' }}>
            <div className="eq-logo-icon">
              <Icons.Leaf />
            </div>
            EcoQuest
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none' }}>
            {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </header>

        {isMobileMenuOpen && (
          <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px', position: 'absolute', top: '60px', left: 0, right: 0, zIndex: 50, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
             <NavItem id="dashboard" label="Dashboard" icon={Icons.Chart} />
             <NavItem id="schools" label="Schools" icon={Icons.Building} />
             <NavItem id="ngo" label="NGO Partners" icon={Icons.Users} />
             <NavItem id="policy" label="Policy Reports" icon={Icons.FileText} />
             <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />
             <button className="eq-nav-item logout">
               <div style={{ width: 20 }}><Icons.LogOut /></div>
               Logout
             </button>
          </div>
        )}

        <main className="eq-content">
          <div className="eq-title-section">
            <h1 className="eq-title">{getTitle()}</h1>
            <p className="eq-subtitle">{getSubtitle()}</p>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default GovernmentDashboard;