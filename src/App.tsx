import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ProfileForm } from './components/ProfileForm';
import { CareerRecommendations } from './components/CareerRecommendations';
import { ResumeBuilder } from './components/ResumeBuilder';
import { SkillAnalysis } from './components/SkillAnalysis';
import { UserProfile } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    // Show success message
    alert('Profile saved successfully! 🎉');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleTabChange} />;
      case 'profile':
        return <ProfileForm onSave={handleProfileSave} />;
      case 'recommendations':
        return <CareerRecommendations userProfile={userProfile} />;
      case 'resume':
        return <ResumeBuilder />;
      case 'skills':
        return <SkillAnalysis userProfile={userProfile} />;
      default:
        return <Dashboard onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="pb-8">
        {renderActiveTab()}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2025 AI Career Advisor. Powered by advanced AI technology to guide your career journey.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Built with ❤️ for career growth and professional development
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;