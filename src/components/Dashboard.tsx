import React from 'react';
import { TrendingUp, Target, Award, Clock, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    {
      title: 'Profile Completion',
      value: '85%',
      change: '+12%',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      title: 'Career Matches',
      value: '12',
      change: '+3',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Skill Score',
      value: '78/100',
      change: '+5',
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      title: 'Last Updated',
      value: '2 days',
      change: 'ago',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Keep your skills and experience current',
      action: () => onNavigate('profile'),
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'Get Career Advice',
      description: 'Discover new career opportunities',
      action: () => onNavigate('recommendations'),
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      title: 'Build Resume',
      description: 'Create ATS-optimized resume',
      action: () => onNavigate('resume'),
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      title: 'Analyze Skills',
      description: 'Identify skill gaps and improvements',
      action: () => onNavigate('skills'),
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Himanshu! 👋</h2>
        <p className="text-gray-600">Here's your career development overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} border-2 rounded-lg p-4 text-left transition-all duration-200 group`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="bg-blue-500 p-2 rounded-full">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Profile updated</p>
              <p className="text-sm text-gray-600">Added new skills and experience</p>
            </div>
            <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="bg-green-500 p-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">New career matches found</p>
              <p className="text-sm text-gray-600">3 new opportunities identified</p>
            </div>
            <span className="text-xs text-gray-500 ml-auto">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};