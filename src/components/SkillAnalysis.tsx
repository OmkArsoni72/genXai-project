import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, BookOpen, ExternalLink, Loader2 } from 'lucide-react';
import { SkillGap } from '../types';
import { aiService } from '../services/aiService';

interface SkillAnalysisProps {
  userProfile: any;
}

export const SkillAnalysis: React.FC<SkillAnalysisProps> = ({ userProfile }) => {
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Full Stack Developer');

  useEffect(() => {
    if (userProfile) {
      analyzeSkills();
    }
  }, [userProfile, selectedRole]);

  const analyzeSkills = async () => {
    setLoading(true);
    try {
      const gaps = await aiService.analyzeSkillGaps(userProfile, selectedRole);
      setSkillGaps(gaps);
    } catch (error) {
      console.error('Error analyzing skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    if (level >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getImportanceColor = (importance: number) => {
    if (importance >= 80) return 'text-red-600';
    if (importance >= 60) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const targetRoles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'AI/ML Engineer',
    'Data Scientist',
    'Product Manager',
    'DevOps Engineer',
    'Mobile Developer'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Skill Analysis</h2>
        <p className="text-gray-600">Identify skill gaps and get personalized learning recommendations</p>
      </div>

      {/* Role Selection */}
      <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Role</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {targetRoles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedRole === role
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Button */}
      <div className="mb-8">
        <button
          onClick={analyzeSkills}
          disabled={loading}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <TrendingUp className="w-4 h-4" />
          )}
          <span>{loading ? 'Analyzing...' : 'Analyze Skills for ' + selectedRole}</span>
        </button>
      </div>

      {/* Skill Gaps */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">AI is analyzing your skill gaps...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {skillGaps.map((gap, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{gap.skill}</h3>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-medium ${getImportanceColor(gap.importance)}`}>
                      {gap.importance}% Important
                    </span>
                    <span className="text-sm text-gray-500">
                      for {selectedRole}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {gap.targetLevel - gap.currentLevel}
                  </div>
                  <div className="text-xs text-gray-500">Points to improve</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Current Level</span>
                    <span className="font-medium">{gap.currentLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getSkillLevelColor(gap.currentLevel)}`}
                      style={{ width: `${gap.currentLevel}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Target Level</span>
                    <span className="font-medium">{gap.targetLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${gap.targetLevel}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Learning Resources */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Recommended Learning Resources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {gap.resources.map((resource, resourceIndex) => (
                    <div
                      key={resourceIndex}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {resource}
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                  <Target className="w-4 h-4" />
                  <span>Start Learning {gap.skill}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {skillGaps.length === 0 && !loading && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skill analysis yet</h3>
          <p className="text-gray-600 mb-4">Select a target role and analyze your skills to get started</p>
        </div>
      )}

      {/* Overall Progress */}
      {skillGaps.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(skillGaps.reduce((acc, gap) => acc + gap.currentLevel, 0) / skillGaps.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(skillGaps.reduce((acc, gap) => acc + gap.targetLevel, 0) / skillGaps.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Target Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {skillGaps.length}
              </div>
              <div className="text-sm text-gray-600">Skills to Improve</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};