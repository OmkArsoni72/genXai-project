import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, Star, ExternalLink, Loader2 } from 'lucide-react';
import { CareerRecommendation } from '../types';
import { aiService } from '../services/aiService';

interface CareerRecommendationsProps {
  userProfile: any;
}

export const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ userProfile }) => {
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'immediate' | 'near-term' | 'long-term'>('all');

  useEffect(() => {
    if (userProfile) {
      generateRecommendations();
    }
  }, [userProfile]);

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const recs = await aiService.generateCareerRecommendations(userProfile);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'immediate': return <Clock className="w-4 h-4" />;
      case 'near-term': return <TrendingUp className="w-4 h-4" />;
      case 'long-term': return <Star className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'immediate': return 'bg-green-100 text-green-800 border-green-200';
      case 'near-term': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'long-term': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Career Recommendations</h2>
        <p className="text-gray-600">AI-powered career suggestions based on your profile</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {['all', 'immediate', 'near-term', 'long-term'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="mb-8">
        <button
          onClick={generateRecommendations}
          disabled={loading}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Brain className="w-4 h-4" />
          )}
          <span>{loading ? 'Analyzing...' : 'Generate New Recommendations'}</span>
        </button>
      </div>

      {/* Recommendations Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">AI is analyzing your profile...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recommendation.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(recommendation.category)}`}>
                      {getCategoryIcon(recommendation.category)}
                      <span>{recommendation.category.replace('-', ' ')}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getConfidenceColor(recommendation.confidenceScore)}`}>
                    {recommendation.confidenceScore}%
                  </div>
                  <div className="text-xs text-gray-500">Match</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {recommendation.description}
              </p>

              {/* Salary & Growth */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Salary Range</div>
                  <div className="font-semibold text-gray-900">{recommendation.salaryRange}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Growth Potential</div>
                  <div className="font-semibold text-gray-900">{recommendation.growthPotential}%</div>
                </div>
              </div>

              {/* Required Skills */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Required Skills</div>
                <div className="flex flex-wrap gap-1">
                  {recommendation.requiredSkills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {recommendation.requiredSkills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{recommendation.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Match Reasons */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Why this matches you</div>
                <ul className="space-y-1">
                  {recommendation.matchReasons.slice(0, 2).map((reason, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                <span>Explore Opportunities</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredRecommendations.length === 0 && !loading && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
          <p className="text-gray-600 mb-4">Complete your profile to get personalized career recommendations</p>
        </div>
      )}
    </div>
  );
};